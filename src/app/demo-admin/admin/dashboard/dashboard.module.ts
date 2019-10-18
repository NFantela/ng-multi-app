import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminDashboardComponent } from './containers/dashboard/dashboard.component';

export const ROUTES: Routes = [
    {path: '', component: AdminDashboardComponent}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES)],
    declarations: [AdminDashboardComponent],
    providers: []
})
export class AdminDashboardModule {}