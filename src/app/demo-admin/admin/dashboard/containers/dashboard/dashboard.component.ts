import { Component } from '@angular/core';

@Component({
    selector: 'admin-dashboard',
    template: `
        <div>
        <table an-table>


      
    <!--    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr> -->
       </table>
        </div>
    `
})
export class AdminDashboardComponent {
    constructor() {}
}