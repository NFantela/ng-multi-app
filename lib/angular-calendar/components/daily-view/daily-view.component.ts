import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'daily-view',
    template : 'daily-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyViewComponent {
    constructor() {}
}