import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'monthly-view',
    templateUrl : 'monthly-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyViewComponent {
    constructor() {}
}