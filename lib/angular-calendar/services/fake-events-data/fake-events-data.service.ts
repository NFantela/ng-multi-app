import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { FakeEvent } from 'lib/angular-calendar/models/fake-event';
import { AngularDateConfig } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';



@Injectable({providedIn: 'root'})
export class FakeEventsDataService{

    constructor() {
        this._currentDay = new Date();
        this._generateEventsBasedOnCurrentDate();
    }
    /* Set current date and image URL  */
    private readonly _currentDay:Date;
    readonly cageImgUrl = 'https://www.placecage.com/300/300';

    generatedFakeEvents:FakeEvent[] = [];


    getEvents({endDate, startDate,  timespan}:AngularDateConfig):Observable<FakeEvent[]>{
        const lastDayDay = endDate.getDate();
        const lastDayMonth = endDate.getMonth();
        const lastDayYear = endDate.getFullYear();

        const firstDayDay = startDate.getDate();
        const firstDayMonth = startDate.getMonth();
        const firstDayYear = startDate.getFullYear();
        
        let foundEvents:FakeEvent[] = [];

        for(let i = 0; i < this.generatedFakeEvents.length; i++){
            const currentEventInLoop = this.generatedFakeEvents[i];
            if(currentEventInLoop){
                const loopEvDay = currentEventInLoop.eventDate.getDate();
                const loopEvMonth = currentEventInLoop.eventDate.getMonth();
                const loopEvYear = currentEventInLoop.eventDate.getFullYear();

                if(timespan === 'day'){
                    if(loopEvYear === lastDayYear && loopEvMonth === lastDayMonth && loopEvDay === lastDayDay){
                        foundEvents.push(currentEventInLoop);
                    }
                } else {
                    // TODO 
                    // month && week
                }
            }
        }
        return of(foundEvents).pipe(delay(800));
    }

    private _generateEventsBasedOnCurrentDate(){

        const dateToMutate = new Date(this._currentDay);
        this.generatedFakeEvents.push( new FakeEvent(
            'Event' ,
            new Date(dateToMutate.setDate(dateToMutate.getDate())),
            'Some description ',
            this.cageImgUrl
        ));

        for(let i = 0; i < 90; i++){
            if( i % 2 == 0){
                // generate event for every odd number
                const event = new FakeEvent(
                    'Event' + i,
                    new Date(dateToMutate.setDate(dateToMutate.getDate() - 2)),
                    'Some description ' + i,
                    this.cageImgUrl
                );
                this.generatedFakeEvents.push(event);
            }
        }

    }

}