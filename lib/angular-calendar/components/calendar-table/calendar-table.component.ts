import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: '[calendar-table]',
    templateUrl: 'calendar-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTableComponent {
    constructor() {}
}