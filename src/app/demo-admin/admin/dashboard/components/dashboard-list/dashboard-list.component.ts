import { Component } from '@angular/core';

@Component({
    selector: 'dashboard-list',
    styleUrls: ['dashboard-list.component.scss'],
    template: `
        <ul class="dashboard-list">
            <li>
                <div class="dashboard-list__first">ist item 1</div>
                <div class="dashboard-list__second">
                    <span class="list-span">Item</span>
                </div> 
            </li>
            <li>
                <div class="dashboard-list__first">ist item 1</div>
                <div class="dashboard-list__second">
                    <span class="list-span">Item</span>
                </div> 
            </li>
        </ul>
    `
})
export class DashboardListComponent {
    constructor() {}
}