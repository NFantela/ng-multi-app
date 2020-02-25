import { Directive, ElementRef, ViewContainerRef, OnDestroy, Input, TemplateRef, OnInit, EmbeddedViewRef, NgZone } from '@angular/core';
import { Platform, normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';

/** Options used to bind passive event listeners. */
const passiveListenerOptions = normalizePassiveListenerOptions({ passive: true });

export type onHoverPositionOptions = 'start' | 'end';

/**
 * Directive used to inject passed <ng-template> on mouseenter 
 */
@Directive({
    selector: '[onHoverTemplate]',
    host: {
        '[class.is-relative]': 'hostRelative'
    }
}) export class OnHoverTemplateDirective implements OnInit, OnDestroy {

    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _viewContainerRef: ViewContainerRef,
        private _platform: Platform,
        private _scrollDispatcher: ScrollDispatcher,
        private _ngZone:NgZone
    ) { }

    /** Manually-bound passive event listeners. */
    private _passiveListeners = new Map<string, EventListenerOrEventListenerObject>();

    private _createdEmbeddedview: EmbeddedViewRef<any>;
    /** Subscription to CDK s scroll dispatcher */
    private _scrollSub:Subscription = Subscription.EMPTY;

    @Input()
    passedTemplate: TemplateRef<any>;

    @Input()
    contextVar: any = null;

    /** This is used to apply host el with relative position
     * Hovewer if contaier el is in table this is useless cuz tr td cannot use position:relative
     */
    @Input()
    hostRelative = false;

    @Input()
    positionOptions: onHoverPositionOptions = 'end';

    /** Expose native element */
    get nativeEl(): HTMLElement {
        return this._elementRef.nativeElement;
    }


    ngOnInit() {
        this._setUpEvents();
        this._scrollSub = this._scrollDispatcher.scrolled(0).subscribe(() => {
            return this._createdEmbeddedview && this._ngZone.run(() => this.hideTemplate()) 
        });
    }

    ngOnDestroy() {
        this._passiveListeners.forEach((listener, event) => {
            this.nativeEl.removeEventListener(event, listener, passiveListenerOptions);
        });
        this._passiveListeners.clear();
        this._scrollSub.unsubscribe();
    }

    /** Binds events to directive s trigger element */
    private _setUpEvents() {
        // The mouse events shouldn't be bound on mobile devices, because they can prevent the
        // first tap from firing its click event or can cause the tooltip to open for clicks.
        if (!this._platform.IOS && !this._platform.ANDROID) {
            this._passiveListeners
                .set('mouseenter', () => this.showTemplate())
                .set('mouseleave', () => this.hideTemplate());
        }

        this._passiveListeners.forEach((listener, event) => {
            this.nativeEl.addEventListener(event, listener, passiveListenerOptions);
        });
    }

    /** Creates embedded view from passed template and optional contextVar.
     * Appends newly created node to parent element as child.
     * If hostRelative is not true we instead calculate and apply fixed positioning
     */
    showTemplate() {
        if (this.passedTemplate) {
            this._createdEmbeddedview = null;
            this._createdEmbeddedview = this._viewContainerRef.createEmbeddedView(this.passedTemplate, { $implicit: this.contextVar });

            if (!this.hostRelative) {
                const clientBoundRect = this.nativeEl.getBoundingClientRect();

                const node = this._createdEmbeddedview.rootNodes[0] as HTMLElement;
                node.style.position = 'fixed';
                node.style.top = `${clientBoundRect.top}px`;
                // if position is start leave it as left but if end we need to calculate right - left
                if (this.positionOptions === 'start') {
                    node.style.left = `${clientBoundRect.left}px`;
                } else {
                    node.style.left = `${clientBoundRect.width + clientBoundRect.left}px`;
                }
            }

            this._createdEmbeddedview.rootNodes.forEach(rootNode => this.nativeEl.appendChild(rootNode));
            this._createdEmbeddedview.detectChanges(); 
        }

    }

    /** Destroys created embedded view */
    hideTemplate() {
        let index = this._createdEmbeddedview ? this._viewContainerRef.indexOf(this._createdEmbeddedview) : -1;
        if (index !== -1) {
            this._viewContainerRef.remove(index);
            this._createdEmbeddedview = null;
        }
    }



}