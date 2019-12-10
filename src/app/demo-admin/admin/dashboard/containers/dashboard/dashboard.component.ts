import { Component } from '@angular/core';

@Component({
    selector: 'admin-dashboard',
    template: `
        <div>
        <table simple-table role="presentation">
                <caption>This is table caption </caption>

                <ng-container simpleColumnDef="firstName"><!-- simpleColumnDef grabs view with header and cell definitions-->
                    <th *simpleHeaderCellDef> <em>Name:</em> </th><!-- captures header cell definition -->
                </ng-container>

                <ng-container simpleColumnDef="email"><!-- simpleColumnDef grabs view with header and cell definitions-->
                    <th *simpleHeaderCellDef> <em>E-mail:</em> </th><!-- captures header cell definition -->
                </ng-container>

                <!-- Borh header-row & row are components whose templaet is <ng-container anCellOutlet></ng-container>-->
                <tr simple-header-row *anHeaderRowDef="displayedColumns"></tr> <!-- anHeaderRowDef captures -->
        </table> 
        </div>
    `
})
export class AdminDashboardComponent {
    constructor() {}
}