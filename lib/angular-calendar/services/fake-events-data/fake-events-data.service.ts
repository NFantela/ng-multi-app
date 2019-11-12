import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, first, tap } from 'rxjs/operators';

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
    private cageImgUrl = 'https://www.placecage.com/300/';

    generatedFakeEvents:FakeEvent[] = [
        new FakeEvent(
            'JS powa event' ,
            new Date(),
            'Some description here',
            this.cageImgUrl + '200'
        ),
        new FakeEvent(
            'Another JS framework relased' ,
            new Date(),
            'Some description here',
            this.cageImgUrl + '400'
        ),
        new FakeEvent(
            'JS Coercion for dummies' ,
            new Date(),
            'You are not prepared!...',
            this.cageImgUrl + '300'
        )
    ];


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
                } 
                // month
                if(timespan === 'month'){
                    if(loopEvYear === lastDayYear && loopEvMonth === lastDayMonth){
                        foundEvents.push(currentEventInLoop);
                    }
                }
                // week - tricky could span between months / year
                if(timespan === 'week'){
                // between and max date TODO NOT WORKING
                    // 1 year match
                    if(loopEvYear == firstDayYear || loopEvYear == lastDayYear ){
                        // 2 month match
                        if(loopEvMonth == firstDayMonth || loopEvMonth == lastDayMonth ){
                            // 3 day match
                            // month crossover e.g. 31 between 28 - 03
                            if(firstDayMonth !== lastDayMonth){
                                if(loopEvMonth === firstDayMonth && loopEvDay >= firstDayDay){
                                    foundEvents.push(currentEventInLoop);
                                }
                                if(loopEvMonth === lastDayMonth && loopEvDay <= lastDayDay){
                                    foundEvents.push(currentEventInLoop);
                                }
                            } else {
                                if(loopEvDay >= firstDayDay && loopEvDay <= lastDayDay) {
                                    foundEvents.push(currentEventInLoop);
                                }
                            }
                        }
                    }
                }
            }
        }
        return of(foundEvents).pipe(delay(100));
    }

    private _generateEventsBasedOnCurrentDate(){
        const dateToMutate = new Date(this._currentDay.getFullYear(), this._currentDay.getMonth() + 1, this._currentDay.getDate() );

        for(let i = 0; i < 90; i++){
            if( i % 2 == 0){
                // generate event for every odd number
                const event = new FakeEvent(
                    'Event' + i,
                    new Date(dateToMutate.setDate(dateToMutate.getDate() - 2)),
                    'Some description ' + i,
                    this.cageImgUrl + ((i > 0 && i < 7) ? i+'00' : '300')
                );
                this.generatedFakeEvents.push(event);
            }
        }
    }

}