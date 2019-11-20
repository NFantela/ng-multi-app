import { OnChanges, IterableDiffer, TemplateRef, IterableDiffers, SimpleChanges, IterableChanges, Directive } from '@angular/core';

/**
 * Base class for the CdkHeaderRowDef and CdkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 */
export abstract class BaseRowDef implements OnChanges {
    /** The columns to be displayed on this row. */
    columns: Iterable<string>;
  
    /** Differ used to check if any changes were made to the columns. */
    protected _columnsDiffer: IterableDiffer<any>;
  
    constructor(
        /** @docs-private */ public template: TemplateRef<any>, protected _differs: IterableDiffers) {
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
    getColumnsDiff(): IterableChanges<any>|null {
      return this._columnsDiffer.diff(this.columns);
    }
  
    /** Gets this row def's relevant cell template from the provided column def. */
    extractCellTemplate(column: CdkColumnDef): TemplateRef<any> {
      if (this instanceof CdkHeaderRowDef) {
        return column.headerCell.template;
      }
      if (this instanceof CdkFooterRowDef) {
        return column.footerCell.template;
      } else {
        return column.cell.template;
      }
    }
}

/**
 * Data row definition for the CDK table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
@Directive({
    selector: '[cdkRowDef]',
    inputs: ['columns: cdkRowDefColumns', 'when: cdkRowDefWhen'],
  })
  export class CdkRowDef<T> extends BaseRowDef {
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