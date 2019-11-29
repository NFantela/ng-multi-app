import { Component, OnInit, ViewChild, ElementRef, Inject, Attribute, ContentChildren, QueryList, AfterContentChecked, IterableDiffer } from '@angular/core';
import { AnDataRowOutlet, AnHeaderRowOutlet, AnFooterRowOutlet } from 'lib/table/directives/outlet.directives';
import { DOCUMENT } from '@angular/common';
import { AnColumnDef } from 'lib/table/directives/column.directives';
import { AnRowDef, AnHeaderRowDef, AnFooterRowDef, BaseRowDef } from 'lib/table/directives/row.directives';

export interface RenderRow<T> {
  data: T;
  dataIndex: number;
  rowDef: AnRowDef<T>;
}

@Component({
    selector: 'table[an-table]',
    styleUrls: ['an-table.component.scss'],
    templateUrl: 'an-table.component.html'
})
export class AnTableComponent<T> implements OnInit, AfterContentChecked {
    constructor( 
        @Inject(DOCUMENT) private _document: any, 
        private _elementRef:ElementRef,
        @Attribute('role') role: string) {
            if (!role) {
                this._elementRef.nativeElement.setAttribute('role', 'grid');
              }
        }

  /** Differ used to find the changes in the data provided by the data source. */
  private _dataDiffer: IterableDiffer<RenderRow<T>>;
  /*====================== ROW DEFINITIONS =================================== */
  /** Stores the row definition that does not have a when predicate. */
  private _defaultRowDef: AnRowDef<T>|null;
  /**
   * Set of all header row definitions that can be used by this table. Populated by the rows
   * gathered by using `ContentChildren` as well as any custom row definitions added to
   * `_customHeaderRowDefs`.
   */
  private _headerRowDefs: AnHeaderRowDef[];
  private _customHeaderRowDefs = new Set<AnHeaderRowDef>();

  private _footerRowDefs: AnFooterRowDef[];
  private _customFooterRowDefs = new Set<AnFooterRowDef>();

  private _rowDefs: AnRowDef<T>[];
  private _customRowDefs = new Set<AnRowDef<T>>();

  /*====================== COLUMN DEFINITIONS =================================== */
  /**
   * Column definitions that were defined outside of the direct content children of the table.
   * These will be defined when, e.g., creating a wrapper around the cdkTable that has
   * column definitions as *its* content child.
   */
  private _customColumnDefs = new Set<AnColumnDef>();
  /**
   * Map of all the user's defined columns (header, data, and footer cell template) identified by
   * name. Collection populated by the column definitions gathered by `ContentChildren` as well as
   * any custom column definitions added to `_customColumnDefs`.
   */
  private _columnDefsByName = new Map<string, AnColumnDef>();

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
  @ContentChildren(AnFooterRowDef, {  descendants: true  }) contentFooterRowDefs: QueryList<AnFooterRowDef>;


  ngAfterContentChecked(){ // TODO remove tjis later
    // console.log(" column defintions ", this.contentColumnDefs);
    // console.log("row definitions ", this.contentRowDefs);
    this._cacheRowDefs();
    this._cacheColumnDefs();
    // Make sure that the user has at least added header, footer, or data row def.
    if (!this._headerRowDefs.length && !this._footerRowDefs.length && !this._rowDefs.length) {
      throw new Error("Table Missing Row Defs");
    }
    // Render updates if the list of columns have been changed for the header, row, or footer defs.
    this._renderUpdatedColumns();
  }


 ngOnInit(){
    this._applyTableSections(); /* generate thead, tbody, tfoot depending on this template s outlets */
 }

 // NEXT a way to render data

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
  /**  Used by ngAfterContentChecked - updates the list of row definitions */
  private _cacheRowDefs(){
    this._headerRowDefs = mergeQueryListAndSet(this.contentHeaderRowDefs, this._customHeaderRowDefs);
    this._footerRowDefs =  mergeQueryListAndSet(this.contentFooterRowDefs, this._customFooterRowDefs);
    this._rowDefs = mergeQueryListAndSet(this.contentRowDefs, this._customRowDefs);

    // After all row definitions are determined, find the row definition to be considered default.
    const defaultRowDefs = this._rowDefs.filter(def => !def.when);

    this._defaultRowDef = defaultRowDefs[0];
  }

  /** Update the map containing the content's column definitions. */
  private _cacheColumnDefs() {
    this._columnDefsByName.clear();

    const columnDefs = mergeQueryListAndSet(this.contentColumnDefs, this._customColumnDefs);
    columnDefs.forEach(columnDef => {
      if (this._columnDefsByName.has(columnDef.name)) {
        throw new Error(`Table Duplicate Column Name Error ${columnDef.name}`);
      }
      this._columnDefsByName.set(columnDef.name, columnDef);
    });
  }

  /**
   * Check if the header, data, or footer rows have changed what columns they want to display  If there is a diff, then
   * re-render that section.
   */
  private _renderUpdatedColumns() {
    const columnsDiffReducer = (acc: boolean, def: BaseRowDef) => acc || !!def.getColumnsDiff();

    // Force re-render data rows if the list of column definitions have changed.
    if (this._rowDefs.reduce(columnsDiffReducer, false)) {
      this._forceRenderDataRows();
    }

    // Force re-render header/footer rows if the list of column definitions have changed..
    if (this._headerRowDefs.reduce(columnsDiffReducer, false)) {
      this._forceRenderHeaderRows();
    }

    if (this._footerRowDefs.reduce(columnsDiffReducer, false)) {
      this._forceRenderFooterRows();
    }
  }

  /**
   * Forces a re-render of the data rows. Should be called in cases where there has been an input
   * change that affects the evaluation of which rows should be rendered, e.g. toggling
   * `multiTemplateDataRows` or adding/removing row definitions.
   */
  private _forceRenderDataRows() {
    this._dataDiffer.diff([]);
    this._rowOutlet.viewContainer.clear();
    this.renderRows();
  }

}


/** Utility function */
function mergeQueryListAndSet<T>(queryList: QueryList<T>, set: Set<T>): T[] {
  return queryList.toArray().concat(Array.from(set));
}