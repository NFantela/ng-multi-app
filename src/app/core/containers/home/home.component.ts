import { Component, OnInit } from '@angular/core';
import { AngularCalendarDateChange } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';
import { FakeEventsDataService } from 'lib/angular-calendar/services/fake-events-data/fake-events-data.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { FakeEvent } from 'lib/angular-calendar/models/fake-event';
import { AngularCalendarData } from 'lib/angular-calendar/models/angular-calendar-data';
import { map, switchMap, filter, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { HotkeysService } from 'src/app/services/hotkeys.service';

export class MyCustomCalendarEvent {
    constructor(public somName:string){}
}

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {

    constructor( 
        private _fakeEventsService:FakeEventsDataService,
        private _hotkeysService: HotkeysService
        ) { }

    loadingData:boolean = false;

    hotkeysServiceSub:Subscription = Subscription.EMPTY;

    events:BehaviorSubject<AngularCalendarDateChange> = new BehaviorSubject(null);
    events$:Observable<AngularCalendarData<FakeEvent>> = this.events.asObservable().pipe(
        filter(v => !!v),
        switchMap(val =>  {
           return  this._fakeEventsService.getEvents(val).pipe(
                map(fakeEvents => {
                    return new AngularCalendarData<FakeEvent>(fakeEvents, 'eventDate');
                }),
                 tap(() => this.loadingData = false)
            )
        })
    );

    ngOnInit(){
        // subscribe ctr+ s hotkeys 
       this.hotkeysServiceSub =  this._hotkeysService.addKeyShortcut({keys: 'control.s'})
            .subscribe((event:KeyboardEvent) => alert(`Hello there you pressed CTRL + ${event.key}` ))
    }

    ngOnDestroy(){
        this.hotkeysServiceSub.unsubscribe();
    }

    handleDateChange(e:AngularCalendarDateChange){
        this.events.next(e);
        // avoiding changed error
        Promise.resolve().then(() => this.loadingData = true);
    }

    otherStartDate = new Date('December 17, 1995 03:24:00');


    // forms for timepicker
    hoursInput = new FormControl('13');
    minutesInput = new FormControl('22');
    secondsInput = new FormControl(54);

}