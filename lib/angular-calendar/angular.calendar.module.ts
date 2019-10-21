import { NgModule } from '@angular/core';

// containers
import { AngularCalendarComponent } from './containers/angular-calendar/angular-calendar.component';

// components
import { WeeklyViewComponent } from './components/weekly-view/weekly-view.component';
import { MonthlyViewComponent } from './components/monthly-view/monthly-view.component';
import { DailyViewComponent } from './components/daily-view/daily-view.component';

@NgModule({
    imports: [],
    declarations: [
        AngularCalendarComponent,
        WeeklyViewComponent,
        MonthlyViewComponent,
        DailyViewComponent
    ],
    exports: [AngularCalendarComponent],
    providers: []
})
export class AngularCalendarModule {}