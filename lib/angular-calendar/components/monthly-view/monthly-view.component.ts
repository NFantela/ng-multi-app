import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'monthly-view',
    template : 'monthly-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyViewComponent {
    constructor() {}
}