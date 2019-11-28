import { NgModule } from '@angular/core';

// containers
import { AnTableComponent } from './containers/an-table/an-table.component';

// components
import { AnHeaderRow, AnFooterRow, AnRow } from './components/row/row.components';

// directives
import { AnDataRowOutlet, AnHeaderRowOutlet, AnFooterRowOutlet } from './directives/outlet.directives';
import { AnCellDef, AnHeaderCellDef, AnFooterCellDef, AnColumnDef } from './directives/column.directives';
import { AnHeaderRowDef, AnRowDef, AnFooterRowDef } from './directives/row.directives';


const EXPORTS = [AnTableComponent, AnCellDef, AnHeaderCellDef, AnFooterCellDef, AnColumnDef ,   AnHeaderRow,   AnFooterRow,   AnRow, AnHeaderRowDef, AnRowDef, AnFooterRowDef];

@NgModule({
    imports: [],
    declarations: [
        AnTableComponent,
        AnDataRowOutlet,
        AnHeaderRowOutlet,
        AnFooterRowOutlet,
        ...EXPORTS
    ],
    exports: EXPORTS,
    providers: []
})
export class AnTableModule {}