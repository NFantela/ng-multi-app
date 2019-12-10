import { NgModule } from '@angular/core';
// directives
import { SimpleTableDataRowOutlet, SimpleTableHeaderRowOutlet, SimpleTableFooterRowOutlet } from './directives/simple-table-outlet/simple-table-outlet.directives';
import { SimpleColumnDef, SimpleHeaderCellDef } from './directives/column/column.directives';

// containers
import { SimpleTableComponent } from './containers/simple-table/simple-table.component';
// components
import { SimpleHeaderRow } from './components/row/row.components';

const EXPORTS = [SimpleTableComponent, SimpleColumnDef, SimpleHeaderCellDef, SimpleHeaderRow];

@NgModule({
    imports: [],
    declarations: [SimpleTableDataRowOutlet, SimpleTableHeaderRowOutlet, SimpleTableFooterRowOutlet, ...EXPORTS],
    exports: [EXPORTS],
    providers: []
})
export class SimpleTableModule {}