import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AngularCalendarCell } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';

@Component({
    selector: '[calendar-table]',
    templateUrl: 'calendar-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTableComponent {
    constructor() {}

    @Input() numCols = 7;

    @Input() rows:Array<AngularCalendarCell[]> = [[]];
}