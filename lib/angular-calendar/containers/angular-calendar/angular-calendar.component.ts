import { Component, ChangeDetectionStrategy, Input, ContentChild, TemplateRef, EventEmitter, Output, Inject, Optional } from '@angular/core';
import { ANGULAR_CALENDAR_CONFIG, AngularCalendarConfig } from 'lib/angular-calendar/tokens/angular-calendar.config';

export class AngularCalendarDateChange{
    constructor(
      public startDate: string,
      public endDate:string,
      public timespan:AngularCalendarTimeSpan
      ) {}
}

export type  AngularCalendarTimeSpan = 'day' | 'week' | 'month';

@Component({
    selector: 'angular-calendar',
    styleUrls: ['../../shared/scss/angular.calendar.scss', 'angular-calendar.component.scss'],
    templateUrl: 'angular-calendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularCalendarComponent {

    constructor(@Optional() @Inject(ANGULAR_CALENDAR_CONFIG) private _config : AngularCalendarConfig) {
        if(this._config){
          this.timespanLabels = {...this.timespanLabels, ...this._config.labels}
        }
    }

  /* ====== INPUTS ======== */

  /** Set the start view or default */
  @Input() startView: AngularCalendarTimeSpan  = 'month';
  /* Color used for primary elements e.g. arrows */
  @Input() primaryColor:string = '#114a9f';

  timespanLabels =  {
    daily : 'daily',
    weekly:  'weekly',
    monthly : 'monthly'
  }

  /** The date to open the calendar to initially. */
  @Input()
  get startDay(): Date | null {
    return this._startDay;
  }
  set startDay(value: Date | null) {
    this.startDay = value || new Date();
  }
  private _startDay: Date | null;

    /* ====== OUTPUTs ======== */
  @Output()
  readonly  calendarDateChange:EventEmitter<AngularCalendarDateChange> = new EventEmitter();

  @ContentChild(TemplateRef, {static:false}) dayTemplate: TemplateRef<any>;

  handleDateChange(changeType: 'prev' |  'next'){
    // TODO
    // TODOOOO
    if(changeType === 'prev'){
        this.calendarDateChange.emit(new AngularCalendarDateChange("01-12", "31-12", "day"))
    } else {

    }
  }

  changeCurrentDateView(i:number){
    console.log(i);
  }

}
