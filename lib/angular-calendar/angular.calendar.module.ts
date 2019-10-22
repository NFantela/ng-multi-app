import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// containers
import { AngularCalendarComponent } from './containers/angular-calendar/angular-calendar.component';

// components
import { WeeklyViewComponent } from './components/weekly-view/weekly-view.component';
import { MonthlyViewComponent } from './components/monthly-view/monthly-view.component';
import { DailyViewComponent } from './components/daily-view/daily-view.component';

// directives
import { AngularCalendarHeadingDirective } from './directives/angular-calendar-heading/angular-calendar-heading';
import { AngularCalendaFooterDirective } from './directives/anuglar-calendar-footer/anuglar-calendar-footer.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AngularCalendarComponent,
        WeeklyViewComponent,
        MonthlyViewComponent,
        DailyViewComponent,
        AngularCalendarHeadingDirective,
        AngularCalendaFooterDirective
    ],
    exports: [AngularCalendarComponent, AngularCalendarHeadingDirective, AngularCalendaFooterDirective],
    providers: []
})
export class AngularCalendarModule {}