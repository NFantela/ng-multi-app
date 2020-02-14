import { Directive, ElementRef, NgZone, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Observable, Observer, fromEvent, ReplaySubject, merge, interval } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

const INTERVAL_AMOUNT = 100;

@Directive({
    selector: '[holdable]',
    exportAs: 'holdableDir'
}) export class HoldableDirective  implements OnDestroy { 

    constructor(
        public elementRef: ElementRef<HTMLElement>,
        private _ngZone: NgZone,){}

    private _destroy$:ReplaySubject<boolean> = new ReplaySubject();

    @Output() 
    readonly intervalValues:EventEmitter<number> = new EventEmitter();

    /** On mouse down fire interval observable */
    private _elementMouseDown: Observable<Event> = new Observable((observer: Observer<Event>) =>
    this._ngZone.runOutsideAngular(() =>
        fromEvent(this.elementRef.nativeElement, 'mousedown').pipe(
            takeUntil(this._destroy$)
        )
        .subscribe(() => this.intervalRunning$.subscribe(v => this._ngZone.run(() => this.intervalValues.emit(v))))));

    /** Define our 2 handlers for mouseup and mouseleave that will complete interval */
    private _elementMouseUp: Observable<Event> =  this._createMouseUpOrLeaveObservables('mouseup');
    private _elementMousLeave: Observable<Event> = this._createMouseUpOrLeaveObservables('mouseleave');

    /** Interval will generate our numeric values that will later be emitted */
    intervalRunning$:Observable<number> = interval(INTERVAL_AMOUNT).pipe(
        map(v => v * 10),
        takeUntil( merge(this._elementMouseUp, this._elementMousLeave) )
    )

    ngOnInit(){
        this._elementMouseDown.subscribe();
        this._elementMouseUp.subscribe();
        this._elementMousLeave.subscribe();
    }
        

    ngOnDestroy(){
        this._destroy$.next(true);
        this._destroy$.complete();
    }

    /** Helper Fn to generate Observables for events */
    private _createMouseUpOrLeaveObservables(type: 'mouseup' | 'mouseleave'):Observable<Event> {
        return new Observable((observer: Observer<Event>) =>
        this._ngZone.runOutsideAngular(() =>
            fromEvent(this.elementRef.nativeElement, type).pipe(takeUntil(this._destroy$))
                .subscribe(observer)));
    }

}