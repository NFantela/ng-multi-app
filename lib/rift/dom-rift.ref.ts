import { Subject, Observable, Subscription} from 'rxjs';
import { NgZone, ComponentFactoryResolver, ComponentRef, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { RiftConfig } from './config/rift.config';
import { ConnectedPositionStrategy } from './connected-position-strategy';

export interface DomRiftReference{
    backdropClick(): Observable<MouseEvent>;
    close(data:{timepickerTime:number}):void;
    riftConfigData:any;
}

export type RiftCloseEvent<T = any> = {
    type: 'backdropClick' | 'closed';
    data : T;
}

export function coerceArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}

export class DomRiftRef<C>{

    constructor(
        private _host: HTMLElement,
        public riftSpawn: HTMLElement,
        private _document: Document,
        private _ngZone: NgZone,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _appRef: ApplicationRef,
        private _defaultInjector: Injector,
        private _riftConfig: RiftConfig<C>
    ) {}

    private _backdropElement: HTMLElement;
    private _backdropClick: Subject<MouseEvent> = new Subject();
    private _backdropSubscription:Subscription;

    private afterClosed = new Subject<any>();
    // return this for subscribing
    afterClosed$ = this.afterClosed.asObservable();

    private _disposeFn: (() => void) | null;

    // TODO ATTACH METHHOD
    // should create backdrop and prepeare for creating componentsd 
    attachToRift():void{
        // 1 we need to create component
        const resolver = this._riftConfig.componentFactoryResolver || this._componentFactoryResolver;
        const componentFactory = resolver.resolveComponentFactory(this._riftConfig.component);
        let componentRef: ComponentRef<any>;
        if(this._riftConfig.viewContainerRef){
            componentRef = this._riftConfig.viewContainerRef.createComponent(
                componentFactory,
                this._riftConfig.viewContainerRef.length,
                this._riftConfig.injector || this._riftConfig.viewContainerRef.injector);
      
                this.setDisposeFn(() => {
                    this._appRef.detachView(componentRef.hostView);  // bug here _appRef not defined
                    componentRef.destroy();
                  });
        } else {
            componentRef = componentFactory.create(this._riftConfig.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(() => {
              this._appRef.detachView(componentRef.hostView);
              componentRef.destroy();
            });
          }
        // add this ref to component instance so hie can call dipose etc...
        componentRef.instance.domRiftRef = this;

        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this.riftSpawn.appendChild(this._getComponentRootNode(componentRef));

        // 2 position strategy? 
        const positionStrategy = new ConnectedPositionStrategy(this._riftConfig.elRef, this._document);
        positionStrategy.attach(this);
        // create / attach backdrop
        this._attachBackdrop();

        // 3 subscribe to backdrop click
        this._backdropSubscription = this.backdropClick().subscribe(() => this._dispose({type: 'backdropClick', data: null}));

    }

    setDisposeFn(fn: () => void) {
        this._disposeFn = fn;
    }

    private _invokeDisposeFn() {
        if (this._disposeFn) {
          this._disposeFn();
          this._disposeFn = null;
        }
    }

    /** Gets the root HTMLElement for an instantiated component. */
    private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    /* 
    * backdropElementCreation
    * bigger one also binds mouse clicks
    */
    private _attachBackdrop() {
        const showingClass = 'dom-rift-backdrop-showing';

        this._backdropElement = this._document.createElement('div');
        this._backdropElement.classList.add('dom-rift-backdrop');

        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this.riftSpawn.parentElement!.insertBefore(this._backdropElement, this.riftSpawn);

        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click',
            (event: MouseEvent) => this._backdropClick.next(event));

        // Add class to fade-in the backdrop after one frame.
        if (typeof requestAnimationFrame !== 'undefined') {
            this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => {
                    if (this._backdropElement) {
                        this._backdropElement.classList.add(showingClass);
                    }
                });
            });
        } else {
            this._backdropElement.classList.add(showingClass);
        }
    }

    /** Toggles a single CSS class or an array of classes on an element. */
    private _toggleClasses(element: HTMLElement, cssClasses: string | string[], isAdd: boolean) {
        const classList = element.classList;

        coerceArray(cssClasses).forEach(cssClass => {
            // No spreading cause of IE
            isAdd ? classList.add(cssClass) : classList.remove(cssClass);
        });
    }

    get riftConfigData():any{
        return this._riftConfig.data;
    }

    /** Detaches the backdrop (if any) associated with the overlay. */
    detachBackdrop(): void {
        let backdropToDetach = this._backdropElement;

        if (!backdropToDetach) {
            return;
        }

        let timeoutId: any;
        let finishDetach = () => {
            // It may not be attached to anything in certain cases (e.g. unit tests).
            if (backdropToDetach && backdropToDetach.parentNode) {
                backdropToDetach.parentNode.removeChild(backdropToDetach);
            }

            // It is possible that a new portal has been attached to this overlay since we started
            // removing the backdrop. If that is the case, only clear the backdrop reference if it
            // is still the same instance that we started to remove.
            if (this._backdropElement == backdropToDetach) {
                this._backdropElement = null;
            }

            if (this._riftConfig.backdropClass) {
                this._toggleClasses(backdropToDetach!, this._riftConfig.backdropClass, false);
            }

            clearTimeout(timeoutId);
        };

        backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');

        this._ngZone.runOutsideAngular(() => {
            backdropToDetach!.addEventListener('transitionend', finishDetach);
        });

        // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
        // In this case we make it unclickable and we try to remove it after a delay.
        backdropToDetach.style.pointerEvents = 'none';

        // Run this outside the Angular zone because there's nothing that Angular cares about.
        // If it were to run inside the Angular zone, every test that used Overlay would have to be
        // either async or fakeAsync.
        timeoutId = this._ngZone.runOutsideAngular(() => setTimeout(finishDetach, 500));
    }

    /** Gets an observable that emits when the backdrop has been clicked. */
    backdropClick(): Observable<MouseEvent> {
        return this._backdropClick.asObservable();
    }

    // expose this for component
    close<T>(data?:T){
        this._dispose({type:'closed', data})
    }

    // clean up -- call this metod at the end
   private _dispose<T>({type, data}): void {
        this.detachBackdrop();
        this._backdropClick.complete();

        if (this._host && this._host.parentNode) {
            this._host.parentNode.removeChild(this._host);
            this._host = null!;
        }
        this._invokeDisposeFn();

        this.afterClosed.next({
            data
        });
        this.afterClosed.complete();
        this._backdropSubscription.unsubscribe();
    }

}