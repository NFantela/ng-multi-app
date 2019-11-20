import { NgModule } from '@angular/core';
// containers
import { TableComponent } from './containers/table/table.component';

// components
import { FooterRowComponent } from './containers/components/footer-row/footer-row.component';
import { HeaderRowComponent } from './containers/components/header-row/header-row.component';
import { Row } from './containers/components/row/row.component';

// directives
import { AnCellDef, AnHeaderCellDef, AnFooterCellDef, AnColumnDef, AnHeaderCell, AnFooterCell, AnCell } from './directives/cell/cell.directives';

const EXPORTS = [TableComponent, AnCellDef, AnHeaderCellDef, AnFooterCellDef, AnColumnDef, AnHeaderCell, AnFooterCell, AnCell];

@NgModule({
    imports: [],
    declarations: [
        TableComponent, 
        FooterRowComponent, HeaderRowComponent, Row,
        ...EXPORTS
    ],
    exports: EXPORTS,
    providers: []
})
export class TableModule {}