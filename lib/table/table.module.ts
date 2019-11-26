import { NgModule } from '@angular/core';

// containers
import { AnTableComponent } from './containers/an-table/an-table.component';

// components


// directives


const EXPORTS = [AnTableComponent];

@NgModule({
    imports: [],
    declarations: [
        AnTableComponent,
        ...EXPORTS
    ],
    exports: EXPORTS,
    providers: []
})
export class AnTableModule {}