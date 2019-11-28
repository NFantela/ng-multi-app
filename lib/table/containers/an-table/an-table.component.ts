import { Component, OnInit, ViewChild, ElementRef, Inject, Attribute, ContentChildren, QueryList } from '@angular/core';
import { AnDataRowOutlet, AnHeaderRowOutlet, AnFooterRowOutlet } from 'lib/table/directives/outlet.directives';
import { DOCUMENT } from '@angular/common';
import { AnColumnDef } from 'lib/table/directives/column.directives';
import { AnRowDef, AnHeaderRowDef, AnFooterRowDef } from 'lib/table/directives/row.directives';

@Component({
    selector: 'table[an-table]',
    styleUrls: ['an-table.component.scss'],
    templateUrl: 'an-table.component.html'
})
export class AnTableComponent<T> implements OnInit {
    constructor( 
        @Inject(DOCUMENT) private _document: any, 
        private _elementRef:ElementRef,
        @Attribute('role') role: string) {
            if (!role) {
                this._elementRef.nativeElement.setAttribute('role', 'grid');
              }
        }


  // Outlets in the table's template where the header, data rows, and footer will be inserted.
  @ViewChild(AnDataRowOutlet, {static: true}) _rowOutlet: AnDataRowOutlet;
  @ViewChild(AnHeaderRowOutlet, {static: true}) _headerRowOutlet: AnHeaderRowOutlet;
  @ViewChild(AnFooterRowOutlet, {static: true}) _footerRowOutlet: AnFooterRowOutlet;

  /**
   * The column definitions provided by the user that contain what the header, data, and footer cells should render for each column.
   */
  @ContentChildren(AnColumnDef, {descendants: true}) contentColumnDefs: QueryList<AnColumnDef>;

  /** Set of data row definitions that were provided to the table as content children. */
  @ContentChildren(AnRowDef, {descendants: true}) contentRowDefs: QueryList<AnRowDef<T>>;
  /** Set of header row definitions that were provided to the table as content children. */
  @ContentChildren(AnHeaderRowDef, {  descendants: true }) contentHeaderRowDefs: QueryList<AnHeaderRowDef>;
  /** Set of footer row definitions that were provided to the table as content children. */
  @ContentChildren(AnFooterRowDef, {  descendants: true  }) _contentFooterRowDefs: QueryList<AnFooterRowDef>;


  ngAfterContentChecked(){ // TODO remove tjis later
    console.log(" column defintions ", this.contentColumnDefs);
    console.log("row definitions ", this.contentRowDefs);
  }


 ngOnInit(){
    this._applyTableSections(); /* generate thead, tbody, tfoot depending on this template s outlets */
 }

 /*================================== PRIVATE METHODS ==================================== */

  /** Adds native table sections (e.g. tbody) and moves the row outlets into them.
   * Use a DocumentFragment so we don't hit the DOM on each iteration.
   */
  private _applyTableSections() {
    const documentFragment = this._document.createDocumentFragment();
    const sections = [
      {tag: 'thead', outlet: this._headerRowOutlet},
      {tag: 'tbody', outlet: this._rowOutlet},
      {tag: 'tfoot', outlet: this._footerRowOutlet},
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