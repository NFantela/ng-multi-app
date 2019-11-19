import { Component, ChangeDetectionStrategy, AfterContentChecked, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'table',
    styleUrls: ['table.component.scss'],
    template: `
        <ng-content select="caption"></ng-content><!-- caption has to always be first -->
        <ng-container headerRowOutlet></ng-container>
        <ng-container rowOutlet></ng-container>
        <ng-container footerRowOutlet></ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> implements AfterContentChecked, OnInit, OnDestroy{

    // type T will be used for data tdype later
    constructor() {}
    
    ngAfterContentChecked(): void {
        // TODO
    }
    ngOnInit(): void {
        // TODO
    }
    ngOnDestroy(): void {
        // TODO
    }

}