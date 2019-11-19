import { NgModule } from '@angular/core';
// containers
import { TableComponent } from './containers/table/table.component';

// directives
import { DataRowOutlet, FooterRowOutlet, HeaderRowOutlet } from './directives/row.directives';

@NgModule({
    imports: [],
    declarations: [TableComponent, DataRowOutlet, FooterRowOutlet, HeaderRowOutlet],
    exports: [TableComponent],
    providers: []
})
export class TableModule {}