import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'an-row, tr[an-row]',
    template: `<ng-container anCellOutlet></ng-container>`,
    host: {
      'class': 'an-row',
      'role': 'row',
    },
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
  })
  export class Row {
  }