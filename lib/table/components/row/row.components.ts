import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

export const AN_ROW_TEMPLATE = `<ng-container anCellOutlet></ng-container>`;


/** Header template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'an-header-row, tr[an-header-row]',
    template: AN_ROW_TEMPLATE,
    host: {
        'class': 'an-header-row',
        'role': 'row',
    },
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
})
export class AnHeaderRow {
}


/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'an-footer-row, tr[an-footer-row]',
    template: AN_ROW_TEMPLATE,
    host: {
        'class': 'an-footer-row',
        'role': 'row',
    },
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
})
export class AnFooterRow {
}

/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'an-row, tr[an-row]',
    template: AN_ROW_TEMPLATE,
    host: {
        'class': 'an-row',
        'role': 'row',
    },
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
})
export class AnRow {
}