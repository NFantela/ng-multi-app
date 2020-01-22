import { NgModule } from '@angular/core';
import { ScrollProgressDirective } from './directives/scroll-progress.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [MatProgressBarModule, CommonModule],
    declarations: [ ScrollProgressDirective],
    exports: [ ScrollProgressDirective],
    providers: []
})
export class ScrollProgressDemoModule {}