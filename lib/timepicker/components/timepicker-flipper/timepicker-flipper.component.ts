import { Component, Input, Output,EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DatepickerType } from '../../directives/timepicker/timepicker.directive';

export type ChangeTimepickerTime = 'increment' | 'decrement';

@Component({
    selector: 'timepicker-flipper',
    styleUrls: ['timepicker-flipper.component.scss'],
    template: `
    <section 
        class="timepicker__timeflipper"
        tabindex="0"
        [class.isFocused]="focused"
        (keydown)="onKeyDown($event)"
        (blur)="onBlur($event)"
        (focus)="onFocus($event)">
            <div class="arrow arrow-up" (click)="changeTime('increment')">
            </div>
            <div class="timepicker__timeflipper-time">
                <span>{{ timepickerTime | formatDigits:type:byTen}}</span>
            </div>
            <div class="arrow arrow-down" (click)="changeTime('decrement')"></div>
    </section>   
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class TimepickerFlipperComponent {
    constructor() {}

    @Input()
    byTen = false;

    @Input()
    type:DatepickerType = 'hours';

    @Input()
    timepickerTime:number;

    @Output()
    clickedChangeTime:EventEmitter<{changeType:ChangeTimepickerTime, byTen:boolean}> = new EventEmitter();

    changeTime(changeType:ChangeTimepickerTime){
        if(changeType){
            this.clickedChangeTime.emit({changeType, byTen: this.byTen})
        }
    }

    onKeyDown(e:KeyboardEvent){
        const handlers = {
            ArrowDown: () => this.changeTime('decrement'),
            ArrowUp: () => this.changeTime('increment')
        };
        if(handlers[e.code]){
            handlers[e.code]();// execute func
            e.preventDefault();
            e.stopPropagation();
        }
    
    }

    focused:boolean = false;

    onBlur(e:FocusEvent){
       this.focused = false ;
       e.preventDefault();
       e.stopPropagation();
    }
    onFocus(e:FocusEvent){
       this.focused = true ;
       e.preventDefault();
       e.stopPropagation();   
    }   

}