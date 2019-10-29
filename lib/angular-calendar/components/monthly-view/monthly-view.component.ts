import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AngularDateConfig } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';
import { AngularCalendarConfig } from 'lib/angular-calendar/tokens/angular-calendar.config';

@Component({
    selector: 'monthly-view',
    templateUrl : 'monthly-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyViewComponent {
    constructor() {}

    @Input()
    set dateInformation(v:AngularDateConfig | null){
        if(v){
            this._dateInformation = v;
            this._generateWeekCells(v);
        }
    };
    private _dateInformation:AngularDateConfig;

    @Input()
    calendarConfig:AngularCalendarConfig;

    // data to be passed to calendar table as rows
    weekCells : any

    private _generateWeekCells(dates:AngularDateConfig){
        // we need arrays in arrays to generate row from first item then <td> from item
        // const daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
        // const dateNames = this._dateAdapter.getDateNames();
        // this._weeks = [[]];
        // for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
        //   if (cell == DAYS_PER_WEEK) {
        //     this._weeks.push([]);
        //     cell = 0;
        //   }
        //   const date = this._dateAdapter.createDate(
        //         this._dateAdapter.getYear(this.activeDate),
        //         this._dateAdapter.getMonth(this.activeDate), i + 1);
        //   const enabled = this._shouldEnableDate(date);
        //   const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
        //   const cellClasses = this.dateClass ? this.dateClass(date) : undefined;
    
        //   this._weeks[this._weeks.length - 1]
        //       .push(new MatCalendarCell(i + 1, dateNames[i], ariaLabel, enabled, cellClasses));
        // }
    }
}