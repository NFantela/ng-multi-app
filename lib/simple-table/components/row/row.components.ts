import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

export const AN_ROW_TEMPLATE = `<ng-container anCellOutlet></ng-container>`;


/** Header template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'simple-header-row, tr[simple-header-row]',
    template: AN_ROW_TEMPLATE,
    host: {
        'class': 'simple-header-row',
        'role': 'row',
    },
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
})
export class SimpleHeaderRow {
}