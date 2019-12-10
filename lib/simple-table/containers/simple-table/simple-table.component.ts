import { Component, Inject, ViewChild, ElementRef, ContentChildren, QueryList } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SimpleTableDataRowOutlet, SimpleTableHeaderRowOutlet, SimpleTableFooterRowOutlet } from 'lib/simple-table/directives/simple-table-outlet/simple-table-outlet.directives';
import { SimpleColumnDef } from 'lib/simple-table/directives/column/column.directives';

@Component({
  selector: 'table[simple-table]',
  templateUrl: 'simple-table.component.html'
})
export class SimpleTableComponent {
  constructor(
    @Inject(DOCUMENT) private _document: any,
    private _elementRef: ElementRef
  ) { }


  // Outlets in the table's template where the header, data rows, and footer will be inserted.
  @ViewChild(SimpleTableDataRowOutlet, { static: true }) _rowOutlet: SimpleTableDataRowOutlet;
  @ViewChild(SimpleTableHeaderRowOutlet, { static: true }) _headerRowOutlet: SimpleTableHeaderRowOutlet;
  @ViewChild(SimpleTableFooterRowOutlet, { static: true }) _footerRowOutlet: SimpleTableFooterRowOutlet;

  /**
   * The column definitions provided by the user that contain what the header, data, and footer cells should render for each column.
   */
  @ContentChildren(SimpleColumnDef, {descendants: true}) contentColumnDefs: QueryList<SimpleColumnDef>;

  ngOnInit() {
    this._applyTableSections(); /* generate thead, tbody, tfoot depending on this template s outlets */
  }

  /** Adds native table sections (e.g. tbody) and moves the row outlets into them.
   * Use a DocumentFragment so we don't hit the DOM on each iteration.
   * This will use _headerRowOutlet, footer, row se view containers accordingly
   */
  private _applyTableSections() {
    const documentFragment = this._document.createDocumentFragment();
    const sections = [
      { tag: 'thead', outlet: this._headerRowOutlet },
      { tag: 'tbody', outlet: this._rowOutlet },
      { tag: 'tfoot', outlet: this._footerRowOutlet },
    ];

    for (const section of sections) {
      const element = this._document.createElement(section.tag);
      element.setAttribute('role', 'rowgroup');
      element.appendChild(section.outlet.elementRef.nativeElement);
      documentFragment.appendChild(element);
    }

    this._elementRef.nativeElement.appendChild(documentFragment);
  }
}