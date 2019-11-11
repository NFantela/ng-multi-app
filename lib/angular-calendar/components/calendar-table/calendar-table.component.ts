import { Component, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';
import { AngularCalendarCell } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';

@Component({
    selector: '[calendar-table]',
    templateUrl: 'calendar-table.component.html',
    styleUrls: ['calendar-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTableComponent {
    constructor() {}

    offsetCells:number[] = [];
    lastRowOffsetCells:number[] = [];

    @Input() numCols = 7;

    @Input()
    eventTemplate: TemplateRef<any> | undefined;

    @Input() 
    set rows(val:Array<AngularCalendarCell[]>){
        if(val && val.length){
            this._rows = val;
            // calculate last row offset
            const lastRowCells = val[val.length - 1].length;
            if(lastRowCells !== 7){
                this.lastRowOffsetCells = [];
                let numToLoop = 7 - lastRowCells;
                while(numToLoop > 0){
                    this.lastRowOffsetCells.push(numToLoop);
                    numToLoop--;
                }
            }
        }
    }
    get rows(){return this._rows;}
    private _rows:Array<AngularCalendarCell[]> = [[]];

    @Input()
    set firstWeekOffset(offset:number){
        this.offsetCells = [];
        if(offset && offset > 0){
            let offsetValue = offset;
            while(offsetValue > 0){
                this.offsetCells.push(offsetValue);
                offsetValue--;
            }
        }
    }


}