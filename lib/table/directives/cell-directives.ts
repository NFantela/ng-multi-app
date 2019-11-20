import { Directive, TemplateRef } from '@angular/core';

/** Base interface for a cell definition. Captures a column's cell template definition. */
export interface CellDefinition {
    template: TemplateRef<any>;
}

/**
 * Cell definition for a  table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({selector: '[cellDef]'})
export class CellDef implements CellDefinition {
  constructor( public template: TemplateRef<any>) {}
}