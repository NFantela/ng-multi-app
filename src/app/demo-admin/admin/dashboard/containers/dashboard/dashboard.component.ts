import { Component } from '@angular/core';

@Component({
    selector: 'admin-dashboard',
    template: `
        <div>
        <table simple-table role="presentation">
                <caption>This is table caption </caption>
        </table> 
        </div>
    `
})
export class AdminDashboardComponent {
    constructor() {}
}