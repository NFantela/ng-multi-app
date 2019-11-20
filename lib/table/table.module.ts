import { NgModule } from '@angular/core';
// containers
import { TableComponent } from './containers/table/table.component';

// components
import { FooterRowComponent } from './containers/components/footer-row/footer-row.component';
import { HeaderRowComponent } from './containers/components/header-row/header-row.component';
import { Row } from './containers/components/row/row.component';

// directives
import { DataRowOutlet, FooterRowOutlet, HeaderRowOutlet } from './directives/row.directives';


@NgModule({
    imports: [],
    declarations: [
        TableComponent, DataRowOutlet, FooterRowOutlet, HeaderRowOutlet,
        FooterRowComponent, HeaderRowComponent, Row
    ],
    exports: [TableComponent],
    providers: []
})
export class TableModule {}