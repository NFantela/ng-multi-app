import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'admin-dashboard',
    styleUrls: ['dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <section class="home">
        <h1> NGRX powered app home page</h1>
            <article class="panel--centered">
                <h3>Reusable list generated via scss mixin</h3>
                <dashboard-list></dashboard-list>
            </article>
        </section>
    `
})
export class AdminDashboardComponent {
    constructor() {}
}