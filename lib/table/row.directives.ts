import { OnChanges, IterableDiffer, TemplateRef, IterableDiffers, SimpleChanges, IterableChanges } from '@angular/core';
import { AnColumnDef } from './directives/column.directives';


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