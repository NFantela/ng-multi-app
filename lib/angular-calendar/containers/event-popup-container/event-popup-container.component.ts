import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'event-popup-container',
    styleUrls: ['event-popup-container.component.scss'],
    templateUrl: 'event-popup-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPopupContainerComponent {
    constructor() {}
}