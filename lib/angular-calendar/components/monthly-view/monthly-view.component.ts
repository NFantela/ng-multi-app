import { Component, ChangeDetectionStrategy, Input, TemplateRef, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { AngularDateConfig, AngularCalendarCell } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';
import { AngularCalendarConfig } from 'lib/angular-calendar/tokens/angular-calendar.config';
import { AngularCalendarData } from 'lib/angular-calendar/models/angular-calendar-data';

@Component({
    selector: 'monthly-view',
    templateUrl : 'monthly-view.component.html',
    styleUrls: ['monthly-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyViewComponent {
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

    @Input()
    labels: string[] = [];

    @Input()
    set eventData(evData:AngularCalendarData<any>){
        if(evData){
            this._generateDaysCells(this._dateInformation, evData)
        }
    }

    @Output()
    passClickedEvents:EventEmitter<{events:any[], origin:HTMLElement, vcr: ViewContainerRef}> = new EventEmitter();

    @Input()
    eventTemplate: TemplateRef<any> | undefined;

    // data to be passed to calendar table as rows
    weekCells : Array<AngularCalendarCell[]>;
    // Number of blank cells in the first row before the 1st of the month. 
    firstWeekOffset: number;

    passClickedShowEvents(e){
        this.passClickedEvents.emit(e);
    }

    private _generateDaysCells(dates:AngularDateConfig, eventData:AngularCalendarData<any> = null){
        // we need arrays in arrays to generate 
        //  so 1 st ngFor will be for rows and then nested one will generated <td>

        // number of days between start and endDate
        const datesInTimespan =  dates.endDate.getDate();
        // in case of month calculate offset
        // get the first day of the month day in week
        const firstDayOfMonth =  dates.startDate.getDay(); // Sunday - Saturday : 0 - 6
        this.firstWeekOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1  
        this.weekCells = [[]];
        // TODO NEXT HERE
        for(let i = 0, cell = this.firstWeekOffset; i < datesInTimespan; i++, cell++){
         // when cell reaches 7 (num of days in the week reset it to 0) and create a new arr 
         // for the cells to be pushed in
            if(cell == 7) {
                this.weekCells.push([])
                cell = 0;
            }
            // if we have events
            let events = [];
            if(eventData){
                eventData.calendarData.forEach(e => {
                    const dateOFEvent = e.dateForItem.getDate();
                    if((i+1) == dateOFEvent){
                        events.push(e);
                    }
                })
            }
            this.weekCells[this.weekCells.length - 1]
                .push(
                    new AngularCalendarCell(i+1, true, events)
                )
        }
    }
}