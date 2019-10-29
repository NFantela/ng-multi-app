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


    getEvents(dateConfig:AngularDateConfig):Observable<FakeEvent[]>{
        // pick from our events based on params
        return of(this.generatedFakeEvents).pipe(delay(800));
    }

    private _generateEventsBasedOnCurrentDate(){

        const dateToMutate = new Date(this._currentDay);
        
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