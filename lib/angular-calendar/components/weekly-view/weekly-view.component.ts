import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'weekly-view',
    template : 'weekly-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeklyViewComponent {
    constructor() {}
}