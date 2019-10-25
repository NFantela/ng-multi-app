import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AngularDateConfig } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';

@Component({
    selector: 'weekly-view',
    templateUrl : 'weekly-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeklyViewComponent {
    constructor() {}

    @Input()
    dateInformation:AngularDateConfig;
}