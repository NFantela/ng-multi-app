import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// containers
import { AngularCalendarComponent } from './containers/angular-calendar/angular-calendar.component';
import { EventPopupContainerComponent } from './containers/event-popup-container/event-popup-container.component';

// components
import { WeeklyViewComponent } from './components/weekly-view/weekly-view.component';
import { MonthlyViewComponent } from './components/monthly-view/monthly-view.component';
import { DailyViewComponent } from './components/daily-view/daily-view.component';
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component';
import { CalendarLoadingSpinnerComponent } from './components/calendar-loading-spinner/calendar-loading-spinner.component';
import { EventBadgeComponent } from './components/event-badge/event-badge.component';

// directives
import { AngularCalendarHeadingDirective } from './directives/angular-calendar-heading/angular-calendar-heading';
import { AngularCalendaFooterDirective } from './directives/anuglar-calendar-footer/anuglar-calendar-footer.directive';

// pipes
import { CurrentDateDisplayed } from './pipes/current-date-displayed/current-date-displayed.pipe';
import { MatchTwoStringsPipe } from './pipes/match-two-strings/match-two-strings.pipe';

// services
import { DomRiftService } from 'lib/rift/dom-rift.service';

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
        AngularCalendaFooterDirective,
        CalendarTableComponent, 
        CurrentDateDisplayed,
        MatchTwoStringsPipe,
        CalendarLoadingSpinnerComponent,
        EventBadgeComponent,
        EventPopupContainerComponent
    ],
    exports: [AngularCalendarComponent, AngularCalendarHeadingDirective, AngularCalendaFooterDirective],
    entryComponents: [EventPopupContainerComponent],
    providers: [DomRiftService]
})
export class AngularCalendarModule {}