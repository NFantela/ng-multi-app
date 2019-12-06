import { NgModule } from '@angular/core';
// directives
import { SimpleTableDataRowOutlet, SimpleTableHeaderRowOutlet, SimpleTableFooterRowOutlet } from './directives/simple-table-outlet/simple-table-outlet.directives';
// containers
import { SimpleTableComponent } from './containers/simple-table/simple-table.component';

const EXPORTS = [SimpleTableComponent];

@NgModule({
    imports: [],
    declarations: [SimpleTableDataRowOutlet, SimpleTableHeaderRowOutlet, SimpleTableFooterRowOutlet, ...EXPORTS],
    exports: [EXPORTS],
    providers: []
})
export class SimpleTableModule {}