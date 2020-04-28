import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { AngularDateConfig } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';
import { AngularCalendarData } from 'lib/angular-calendar/models/angular-calendar-data';

type HourItem = {display: string, value:number, events:any[]}; 
@Component({
    selector: 'daily-view',
    templateUrl : 'daily-view.component.html',
    styleUrls: ['daily-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyViewComponent {

    constructor(private _vcr:ViewContainerRef) {}

    @Input()
    set dateInformation(v:AngularDateConfig | null){
        if(v){
            this._dateInformation = v;
            this._generateHourItems(v);
        }
    };
    private _dateInformation:AngularDateConfig;

    @Input()
    set eventData(evData:AngularCalendarData<any>){
        if(evData && this._dateInformation){
            this._generateHourItems(this._dateInformation, evData);
        }
    }

    @Output()
    passClickedEvents:EventEmitter<{events:any[], origin:HTMLElement, vcr: ViewContainerRef}> = new EventEmitter();
    /* Array to loop in template to generate hour lines */
    hourItems:Array<HourItem> = [];

    showEvents(event:any, origin:HTMLElement){
        // TODO WRONG FORMAT HERE 
        this.passClickedEvents.emit({events : [{item:event, dateForItem:null}], origin, vcr: this._vcr});
    }

    private _generateHourItems(dateConfig: AngularDateConfig,  data:AngularCalendarData<any> = null){
        // we have 24 hours in a day
        // .getHours() - integer between 0 and 23
        // dateConfig we have only 1 day end and start are the same
        let currenthourItems = [];
        if(data){
            for(let i = 0; i < 24; i++){
                const hourItem :HourItem  = {display: (i < 10) ? '0'+i : i.toString(), value: i, events:[]};

                data.calendarData.forEach(e => {
                    const hourOfEvent = e.dateForItem.getHours();
                    if(i == hourOfEvent){
                        hourItem.events.push(e.item);
                    }
                })
                currenthourItems.push(hourItem);
            }
        } else {
            for(let i = 0; i < 24; i++){
                currenthourItems.push({display: (i < 10) ? '0'+i : i.toString(), value: i, events:[]});
            }
        }

        this.hourItems = currenthourItems;
    }
}