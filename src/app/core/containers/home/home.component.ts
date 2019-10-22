import { Component } from '@angular/core';
import { AngularCalendarDateChange } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent {
    constructor() {}

    handleDateChange(e:AngularCalendarDateChange){
        console.log(e);
    }
}