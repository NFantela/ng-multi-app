import { Component } from '@angular/core';
import { AngularCalendarDateChange } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';
import { FakeEventsDataService } from 'lib/angular-calendar/services/fake-events-data/fake-events-data.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FakeEvent } from 'lib/angular-calendar/models/fake-event';
import { AngularCalendarData } from 'lib/angular-calendar/models/angular-calendar-data';
import { map, switchMap, filter } from 'rxjs/operators';

export class MyCustomCalendarEvent {
    constructor(public somName:string){}
}

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent {

    constructor( private _fakeEventsService:FakeEventsDataService ) { }

    events:BehaviorSubject<AngularCalendarDateChange> = new BehaviorSubject(null);
    events$:Observable<AngularCalendarData<FakeEvent>> = this.events.asObservable().pipe(
        filter(v => !!v),
        switchMap(val =>  {
           return  this._fakeEventsService.getEvents(val).pipe(
                map(fakeEvents => {
                    return new AngularCalendarData<FakeEvent>(fakeEvents, 'eventDate');
                })
            )
        })
    )    

    handleDateChange(e:AngularCalendarDateChange){
        this.events.next(e);
    }

    otherStartDate = new Date('December 17, 1995 03:24:00');

}