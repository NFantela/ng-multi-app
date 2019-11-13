import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'event-badge',
    styleUrls: ['event-badge.component.scss'],
    templateUrl: 'event-badge.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventBadgeComponent {
    constructor() {}

    @Input()
    inCalendarCell = true;
}