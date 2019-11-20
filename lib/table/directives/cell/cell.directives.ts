import { ContentChild, Directive, ElementRef, Input, TemplateRef } from '@angular/core';

/** Base interface for a cell definition. Captures a column's cell template definition. */
export interface CellDef {
    template: TemplateRef<any>;
}
/* ======================== CELL DEFINITION DIRECTIVES (header, cell , footer) ================== 
 * Captures the template of a column's data row cell as well as cell-specific properties.
*/
// <td mat-cell *anCellDef="let element"> {{element.position}} </td>

@Directive({ selector: '[anCellDef]' })
export class AnCellDef implements CellDef {
    constructor(public template: TemplateRef<any>) { }
}

@Directive({ selector: '[anHeaderCellDef]' })
export class AnHeaderCellDef implements CellDef {
    constructor(public template: TemplateRef<any>) { }
}

@Directive({ selector: '[anFooterCellDef]' })
export class AnFooterCellDef implements CellDef {
    constructor(public template: TemplateRef<any>) { }
}

/**
 * Defines a set of cells available for a table column.
 *   <ng-container anColumnDef="position">
        <th mat-header-cell *anHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let element"> {{element.position}} </td>
     </ng-container>
 */
@Directive({
    selector: '[anColumnDef]',
})
export class AnColumnDef {
    /** Unique name for this column. */
    @Input('anColumnDef')
    get name(): string {
        return this._name;
    }
    set name(name: string) {
        // If the directive is set without a name (updated programatically), then this setter will
        // trigger with an empty string and should not overwrite the programatically set value.
        if (!name) {
            return;
        }

        this._name = name;
        this.cssClassFriendlyName = name.replace(/[^a-z0-9_-]/ig, '-');
    }
    _name: string;

    @ContentChild(AnCellDef, { static: false }) cell: AnCellDef;
    @ContentChild(AnHeaderCellDef, { static: false }) headerCell: AnHeaderCellDef;
    @ContentChild(AnFooterCellDef, { static: false }) footerCell: AnFooterCellDef;

    /**
     * Transformed version of the column name that can be used as part of a CSS classname. Excludes
     * all non-alphanumeric characters and the special characters '-' and '_'. Any characters that
     * do not match are replaced by the '-' character.
     */
    cssClassFriendlyName: string;
}
/*============ DIRECTIVES that ADD CSS CLASSES to the element ==========================
* they use the parent directive AnColumnDef  <ng-container anColumnDef="position">
* and apply css clsses to host element
**/

/** Base class for the cells. Adds a CSS classname that identifies the column it renders in. */
export class BaseAnCell {
    constructor(columnDef: AnColumnDef, elementRef: ElementRef) {
        const columnClassName = `an-column-${columnDef.cssClassFriendlyName}`;
        elementRef.nativeElement.classList.add(columnClassName);
    }
}

@Directive({
    selector: 'an-header-cell, th[an-header-cell]',
    host: {
        'class': 'an-header-cell',
        'role': 'columnheader',
    },
})
export class AnHeaderCell extends BaseAnCell {
    constructor(columnDef: AnColumnDef, elementRef: ElementRef) {
        super(columnDef, elementRef);
    }
}

@Directive({
    selector: 'an-footer-cell, td[an-footer-cell]',
    host: {
        'class': 'an-footer-cell',
        'role': 'gridcell',
    },
})
export class AnFooterCell extends BaseAnCell {
    constructor(columnDef: AnColumnDef, elementRef: ElementRef) {
        super(columnDef, elementRef);
    }
}

@Directive({
    selector: 'an-cell, td[an-cell]',
    host: {
        'class': 'an-cell',
        'role': 'gridcell',
    },
})
export class AnCell extends BaseAnCell {
    constructor(columnDef: AnColumnDef, elementRef: ElementRef) {
        super(columnDef, elementRef);
    }
}