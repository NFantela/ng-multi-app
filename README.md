# NgMultiApp

# 1 CONTENTS
-- Has separated importable calendar module & timepicker module for angular
-- Both Calendar and Timepicker use custom dom-rift service for creating and positioning of pop-up DOM elements 
-- Uses NGRX store
-- Has separate routed store dashboard app

# SCSS uses SMACSS and BEM methodology

# 2 Calendar
-- has ANGULAR_CALENDAR_CONFIG config options for module in which it is imported
-- accepts ng-template for event pop-up (created via rift service)
-- daily / weekly / monthly view
-- Heading / Footer strings can be passed 
-- @Input-s : selectedView, loadingData, eventData (any type of data but if the event is passed it has to be the same type)
-- @Output-: calendarDateChange - outputs : AngularCalendarDateChange object

        <angular-calendar
            [selectedView]="'week'"
            [loadingData]="loadingData" 
            [eventData]="events$ | async"
            (calendarDateChange)="handleDateChange($event)">
                    <angular-calendar-heading>
                        <h3>Hello this is heading that is projected via directive</h3>
                    </angular-calendar-heading>

                    <ng-template let-event>
                            <div class="my-event">
                                <h3>{{ event.eventName }}</h3>
                                <img [src]="event.eventImg">
                                <p>{{event.eventDescription}} </p>
                            </div>
                    </ng-template>
                    
                    <angular-calendar-footer>Some footer information</angular-calendar-footer>
        </angular-calendar>

# 3 Simple timepicker
-- connects dynamically created timepicker to input field or form control
-- can be used for hours, minutes or seconds
-- accepts keyboard UP | DOWN arrow inputs
-- Input()-s 
    type: 'hours' | 'minutes' | 'seconds',
    timepickerFieldControl - if reactive forms are used

    <label>
        hours
        <input 
            type="text" 
            timepicker="hours"
            [formControl]="hoursInput" 
            [timepickerFieldControl]="hoursInput"/>
    </label>

#4 Optimized progress bar (outside ngZone)
-- exportable Directive that can be then passed to other element e.g. progress bar
        <div class="custom-scroll-container" scroll-progress #scrollProgress="scrollProgress">...</div>
        <mat-progress-bar mode="determinate" color="primary" [value]="scrollProgress.emitNewScroll | async"> </mat-progress-bar>
        
#5 Holdable directive (outside ngZone)
-- Hold mouse pressed down to fill progress bar - e.g. can be used on delete btn s
<button type="button" class="btn btn--success" holdable #holdableDir="holdableDir">Hold me!</button>
<mat-progress-bar 
    mode="determinate" color="primary" [value]="holdableDir.intervalValues | async">
</mat-progress-bar>  
    
