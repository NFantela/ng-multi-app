import { Directive, ElementRef, NgZone, Output, Optional, OnInit, EventEmitter } from "@angular/core";
import { animationFrameScheduler, asapScheduler, Subscription } from 'rxjs';

import { CdkScrollable, ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { Directionality } from '@angular/cdk/bidi';
import { startWith, auditTime } from 'rxjs/operators';

const SCROLL_SCHEDULER =
    typeof requestAnimationFrame !== 'undefined' ? animationFrameScheduler : asapScheduler;

@Directive({
    selector: '[scroll-progress]',
    exportAs: 'scrollProgress'
}) export class ScrollProgressDirective extends CdkScrollable implements OnInit {

    constructor(
        public elementRef: ElementRef<HTMLElement>,
        ngZone: NgZone,
        @Optional() dir: Directionality,
        scrollDispatcher: ScrollDispatcher,
        @Optional() viewportRuler?: ViewportRuler) {

            super(elementRef, scrollDispatcher, ngZone, dir);
    }

    /** Subscription to changes in the viewport size. */
    private _viewportChanges = Subscription.EMPTY;

    private _clientHeight:number = 0;

    @Output()
    public emitNewScroll:EventEmitter<number> = new EventEmitter();

    ngOnInit(){
        super.ngOnInit();
        /** Defered primise allows the viewport to be rendered
         * Running outside zone to avoid change detection
         */
        this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => {
            this._clientHeight = this.measureScrollOffset('bottom'); // we need this to get initial height of container
    
          this.elementScrolled()
              .pipe(
                  // STart with fake scroll event
                  startWith(null!),
                  // Collect multiple events into one until the next animation frame.
                  auditTime(0, SCROLL_SCHEDULER))
              .subscribe(() => {
                  this.ngZone.run(() => this.emitNewScroll.emit(this._calculatePercentage()));
                }); 
    
        }));
    }


    private _calculatePercentage(){
        return Math.floor(this.measureScrollOffset('top') / this._clientHeight * 100);
    }

}