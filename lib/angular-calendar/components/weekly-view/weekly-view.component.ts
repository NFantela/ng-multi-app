import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AngularDateConfig, AngularCalendarCell } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';
import { AngularCalendarConfig } from 'lib/angular-calendar/tokens/angular-calendar.config';
import { AngularCalendarData } from 'lib/angular-calendar/models/angular-calendar-data';

@Component({
    selector: 'weekly-view',
    templateUrl : 'weekly-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeklyViewComponent {
    constructor() {}

    @Input()
    set dateInformation(v:AngularDateConfig | null){
        if(v){
            this._dateInformation = v;
            this._generateDaysCells(v);
        }
    };
    private _dateInformation:AngularDateConfig;

    @Input()
    calendarConfig:AngularCalendarConfig;

    // TODO CALCULATE CELLS here!!
    // START API

    @Input()
    set eventData(evData:AngularCalendarData<any>[]){
        if(evData && evData.length){
            this._generateDaysCells(this._dateInformation, evData)
        }
    }

    @Input()
    labels: Array<{[key:string]: string}> = [];

    // data to be passed to calendar table as rows
    dayCells : Array<AngularCalendarCell[]>;

    private _generateDaysCells(dates:AngularDateConfig, eventData = []){
        // we need arrays in arrays to generate 
        //  so 1 st ngFor will be for rows and then nested one will generated <td>

        // in case of week there will every only be 1 row

        // number of days between start and endDate
        const datesInTimespan = (dates && dates.timespan === 'week')  ? 7  : dates.endDate.getDate();
        console.log(datesInTimespan);

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