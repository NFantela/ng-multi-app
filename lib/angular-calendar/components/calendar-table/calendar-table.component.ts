import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: '[calendar-table]',
    templateUrl: 'calendar-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTableComponent {
    constructor() {}

    @Input() numCols = 7;

    @Input() rows = 1;
}