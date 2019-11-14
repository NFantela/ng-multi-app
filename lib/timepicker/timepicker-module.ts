import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimepickerDirective } from './directives/timepicker/timepicker.directive';
import { TimepickerContainerComponent } from './containers/timepicker-container/timepicker-container.component';
import { DomRiftService } from '../rift/dom-rift.service';
import { TimepickerFlipperComponent } from './components/timepicker-flipper/timepicker-flipper.component';
import { FormatDigitsPipe } from './pipes/format-digits/format-digits.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [TimepickerDirective, TimepickerContainerComponent, TimepickerFlipperComponent, FormatDigitsPipe],
    entryComponents: [TimepickerContainerComponent],
    exports: [TimepickerDirective],
    providers: [DomRiftService]
})
export class TimepickerModule {}