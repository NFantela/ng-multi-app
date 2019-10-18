import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// containers
import { UsersComponent } from './containers/users/users.component';

export const ROUTES: Routes = [
    {path: '', component: UsersComponent}
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [UsersComponent],
    providers: []
})
export class AdminUsersModule {}