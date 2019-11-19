import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sidebar',
    styleUrls: ['sidebar.component.scss'],
    templateUrl: 'sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    constructor() {}
}