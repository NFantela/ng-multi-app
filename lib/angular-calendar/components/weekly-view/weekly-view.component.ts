import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AngularDateConfig } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';
import { AngularCalendarConfig } from 'lib/angular-calendar/tokens/angular-calendar.config';

@Component({
    selector: 'weekly-view',
    templateUrl : 'weekly-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeklyViewComponent {
    constructor() {}

    @Input()
    dateInformation:AngularDateConfig;

    @Input()
    calendarConfig:AngularCalendarConfig;
}