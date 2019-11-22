import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { AnCellDef, AnColumnDef } from '../cell/cell.directives';


/**
 * Base class for the AnHeaderRowDef and AnRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 */
export abstract class BaseRowDef implements OnChanges {
  /** The columns to be displayed on this row. */
  columns: Iterable<string>;

  /** Differ used to check if any changes were made to the columns. */
  protected _columnsDiffer: IterableDiffer<any>;

  constructor(
    public template: TemplateRef<any>, protected _differs: IterableDiffers) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Create a new columns differ if one does not yet exist. Initialize it based on initial value
    // of the columns property or an empty array if none is provided.
    if (!this._columnsDiffer) {
      const columns = (changes['columns'] && changes['columns'].currentValue) || [];
      this._columnsDiffer = this._differs.find(columns).create();
      this._columnsDiffer.diff(columns);
    }
  }

  /**
   * Returns the difference between the current columns and the columns from the last diff, or null
   * if there is no difference.
   */
  getColumnsDiff(): IterableChanges<any> | null {
    return this._columnsDiffer.diff(this.columns);
  }

  /** Gets this row def's relevant cell template from the provided column def. */
  extractCellTemplate(column: AnColumnDef): TemplateRef<any> {
    if (this instanceof AnHeaderRowDef) {
      return column.headerCell.template;
    }
    if (this instanceof AnFooterRowDef) {
      return column.footerCell.template;
    } else {
      return column.cell.template;
    }
  }
}

/**
 * Header row definition for the AN table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
  selector: '[anHeaderRowDef]',
  inputs: ['columns: anHeaderRowDef'],
})
export class AnHeaderRowDef extends BaseRowDef implements OnChanges {
  constructor(template: TemplateRef<any>, _differs: IterableDiffers) {
    super(template, _differs);
  }
  // Prerender fails to recognize that ngOnChanges in a part of this class through inheritance.
  // Explicitly define it so that the method is called as part of the Angular lifecycle.
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

}

@Directive({
  selector: '[anFooterRowDef]',
  inputs: ['columns: anFooterRowDef', 'sticky: anFooterRowDefSticky'],
})
export class AnFooterRowDef extends BaseRowDef implements OnChanges {
  constructor(template: TemplateRef<any>, _differs: IterableDiffers) {
    super(template, _differs);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }
}

/**
 * Data row definition for the CDK table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
@Directive({
  selector: '[andRowDef]',
  inputs: ['columns: andRowDefColumns', 'when: andRowDefWhen'],
})
export class AnRowDef<T> extends BaseRowDef {
  /**
   * Function that should return true if this row template should be used for the provided index
   * and row data. If left undefined, this row will be considered the default row template to use
   * when no other when functions return true for the data.
   * For every row, there must be at least one when function that passes or an undefined to default.
   */
  when: (index: number, rowData: T) => boolean;

  // TODO(andrewseguin): Add an input for providing a switch function to determine
  //   if this template should be used.
  constructor(template: TemplateRef<any>, _differs: IterableDiffers) {
    super(template, _differs);
  }
}

@Directive({ selector: '[anCellOutlet]' })
export class AnCellOutlet implements OnDestroy {
  /** The ordered list of cells to render within this outlet's view container */
  cells: AnCellDef[];

  /** The data context to be provided to each cell */
  context: any;

  /**
   * Static property containing the latest constructed instance of this class.
   * Used by the CDK table when each CdkHeaderRow and CdkRow component is created using
   * createEmbeddedView. After one of these components are created, this property will provide
   * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
   * construct the cells with the provided context.
   */
  static mostRecentCellOutlet: AnCellOutlet | null = null;

  constructor(public _viewContainer: ViewContainerRef) {
    AnCellOutlet.mostRecentCellOutlet = this;
  }

  ngOnDestroy() {
    // If this was the last outlet being rendered in the view, remove the reference
    // from the static property after it has been destroyed to avoid leaking memory.
    if (AnCellOutlet.mostRecentCellOutlet === this) {
      AnCellOutlet.mostRecentCellOutlet = null;
    }
  }
}