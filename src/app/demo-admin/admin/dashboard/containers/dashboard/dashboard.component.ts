import { Component } from '@angular/core';

@Component({
    selector: 'admin-dashboard',
    template: `
        <div>
        <table an-table role="presentation">
            <caption>This is table caption </caption>

            <ng-container anColumnDef="position">
                <th *anHeaderCellDef> Position. </th>
                <td  *anCellDef="let element"> asdasd </td>
            </ng-container>     

            <ng-container anColumnDef="whatever">
                <th *anHeaderCellDef> No. </th>
                <td *anCellDef="let element">a asds </td>
            </ng-container>

            <tr an-header-row *anHeaderRowDef="displayedColumns"></tr>
            <tr an-row *anRowDef="let row; columns: displayedColumns;"></tr> 
       </table>
        </div>
    `
})
export class AdminDashboardComponent {
    constructor() {}
}