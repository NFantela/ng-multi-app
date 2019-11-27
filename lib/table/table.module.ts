import { NgModule } from '@angular/core';

// containers
import { AnTableComponent } from './containers/an-table/an-table.component';

// components


// directives
import { AnDataRowOutlet, AnHeaderRowOutlet, AnFooterRowOutlet } from './directives/outlet.directives';


const EXPORTS = [AnTableComponent];

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