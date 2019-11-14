import { Component } from '@angular/core';
import { AngularCalendarDateChange } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';
import { FakeEventsDataService } from 'lib/angular-calendar/services/fake-events-data/fake-events-data.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FakeEvent } from 'lib/angular-calendar/models/fake-event';
import { AngularCalendarData } from 'lib/angular-calendar/models/angular-calendar-data';
import { map, switchMap, filter, tap, delay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export class MyCustomCalendarEvent {
    constructor(public somName:string){}
}

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent {

    constructor( private _fakeEventsService:FakeEventsDataService ) { }

    loadingData:boolean = false;

    events:BehaviorSubject<AngularCalendarDateChange> = new BehaviorSubject(null);
    events$:Observable<AngularCalendarData<FakeEvent>> = this.events.asObservable().pipe(
        filter(v => !!v),
        switchMap(val =>  {
           return  this._fakeEventsService.getEvents(val).pipe(
            tap(() => this.loadingData = true),
            delay(700),
                map(fakeEvents => {
                    return new AngularCalendarData<FakeEvent>(fakeEvents, 'eventDate');
                }),
                 tap(() => this.loadingData = false)
            )
        })
    )    

    handleDateChange(e:AngularCalendarDateChange){
        this.events.next(e);
    }

    otherStartDate = new Date('December 17, 1995 03:24:00');


    // forms for timepicker
    hoursInput = new FormControl('13');
    minutesInput = new FormControl('22');
    secondsInput = new FormControl(54);

}