import { Component, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';
import { AngularDateConfig } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';

@Component({
    selector: 'daily-view',
    templateUrl : 'daily-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyViewComponent {
    constructor() {}

    @Input()
    dateInformation:AngularDateConfig;

    @Input()
    eventTemplate: TemplateRef<any> | undefined;
}