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
    set eventData(evData:AngularCalendarData<any>){
        if(evData){
            this._generateDaysCells(this._dateInformation, evData)
        }
    }

    @Input()
    labels: Array<{[key:string]: string}> = [];

    // data to be passed to calendar table as rows
    dayCells : Array<AngularCalendarCell[]>;

    private _generateDaysCells(dates:AngularDateConfig, eventData:AngularCalendarData<any> = null){
        // we need arrays in arrays to generate 
        //  so 1 st ngFor will be for rows and then nested one will generated <td>

        // in case of week there will every only be 1 row
        this.dayCells = [[]];

        // we need all the days to loop over them this is important because of monthcrossing
        const startatDate = dates.startDate.getDate();
        let dateToMutate = new Date(dates.endDate );

        while (dateToMutate.getDate() !== startatDate -1) {
               // if we have events
               let events = [];
               if(eventData){
                   eventData.calendarData.forEach(e => {
                       const dateOFEvent = e.dateForItem.getDate();
                       if((dateToMutate.getDate()) == dateOFEvent){
                           events.push(e);
                       }
                   })
               }
               this.dayCells[this.dayCells.length - 1]
                .push(
                       new AngularCalendarCell(dateToMutate.getDate(), true, events)
                );
                   dateToMutate = new Date(dateToMutate.setDate(dateToMutate.getDate() -1));         
        }
        this.dayCells = [[...this.dayCells[0].reverse()]];
    }
    
}