import { Directive, Input, TemplateRef, ContentChild } from '@angular/core';

export interface ICellDef {
    template: TemplateRef<any>;
}
  
/**
 * Cell definitions
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({selector: '[anCellDef]'})
export class AnCellDef implements ICellDef {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({selector: '[anHeaderCellDef]'})
export class AnHeaderCellDef implements ICellDef {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({selector: '[anFooterCellDef]'})
export class AnFooterCellDef implements ICellDef {
  constructor(public template: TemplateRef<any>) {}
}

 /*  Grabs group of column defeinitions (cell, header, footer) later will be extracted via extractCellTemplate from  BaseRowDef*/
@Directive({
    selector: '[anColumnDef]'
}) export class AnColumnDef {

    cssClassFriendlyName: string;

    @Input('anColumnDef')
    get name(): string {
        return this._name;
    }
    set name(name: string) {
        if (!name) {
            return;
        }

        this._name = name;
        this.cssClassFriendlyName = name.replace(/[^a-z0-9_-]/ig, '-');
    }
    _name: string;

  @ContentChild(AnCellDef, {static: true}) cell: AnCellDef;

  @ContentChild(AnHeaderCellDef, {static: true}) headerCell: AnHeaderCellDef;

  @ContentChild(AnFooterCellDef, {static: true}) footerCell: AnFooterCellDef;

}