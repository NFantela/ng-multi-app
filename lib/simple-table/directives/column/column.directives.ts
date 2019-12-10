import { Directive, TemplateRef, Input, ContentChild } from '@angular/core';


@Directive({selector: '[simpleHeaderCellDef]'})
export class SimpleHeaderCellDef {
  constructor(public template: TemplateRef<any>) {}
}

 /*  Grabs group of column defeinitions (cell, header, footer) later will be extracted via extractCellTemplate from  BaseRowDef*/
 @Directive({
    selector: '[simpleColumnDef]'
}) export class SimpleColumnDef {

    cssClassFriendlyName: string;

    @Input('simpleColumnDef')
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

  @ContentChild(SimpleHeaderCellDef, {static: true}) headerCell: SimpleHeaderCellDef;
  // MISSING FOOTER AND CELL DEF 


}