import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

/** Header template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'header-row, tr[header-row]',
    template: `<ng-container cdkCellOutlet></ng-container>`,
    host: {
        'class': 'header-row',
        'role': 'row',
    },
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
})
export class HeaderRowComponent { }