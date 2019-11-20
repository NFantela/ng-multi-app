import { ViewEncapsulation, Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'footer-row, tr[footer-row]',
    template: `<ng-container cdkCellOutlet></ng-container>`,
    host: {
        'class': 'footer-row',
        'role': 'row',
    },
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
})
export class FooterRowComponent { }