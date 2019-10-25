import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AngularDateConfig } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';

@Component({
    selector: 'monthly-view',
    templateUrl : 'monthly-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyViewComponent {
    constructor() {}

    @Input()
    dateInformation:AngularDateConfig;
}