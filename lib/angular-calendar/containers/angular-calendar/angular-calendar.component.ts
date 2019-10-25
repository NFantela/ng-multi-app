import { Component, ChangeDetectionStrategy, Input, ContentChild, TemplateRef, EventEmitter, Output, Inject, Optional, OnDestroy, OnInit } from '@angular/core';
import { ANGULAR_CALENDAR_CONFIG, AngularCalendarConfig } from 'lib/angular-calendar/tokens/angular-calendar.config';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AngularDateConfig  {
   startDate: Date;
   endDate:Date;
   timespan:AngularCalendarTimeSpan
}

export class AngularCalendarDateChange implements  AngularDateConfig{
    constructor(
      public startDate: Date,
      public endDate:Date,
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
export class AngularCalendarComponent implements OnDestroy, OnInit{

    constructor(@Optional() @Inject(ANGULAR_CALENDAR_CONFIG) private _config : AngularCalendarConfig) {
        if(this._config){
          this.timespanLabels = {...this.timespanLabels, ...this._config.labels}
        }
    }

    /* Main date config Subject */
    dateData:BehaviorSubject<AngularDateConfig> = new BehaviorSubject(null);
    dateData$ = this.dateData.asObservable().pipe(tap(console.log));

  /* ====== INPUTS ================ */
  /** Set the start view or default */
  @Input() selectedView: AngularCalendarTimeSpan  = 'month';
  /* Color used for primary elements e.g. arrows */
  @Input() primaryColor:string = '#114a9f';

  timespanLabels =  {
    daily : 'daily',
    weekly:  'weekly',
    monthly : 'monthly'
  }

  /** The date to open the calendar to initially. */
  @Input()
  get startAtDay(): Date | null {
    return this._startAtDay;
  }
  set startAtDay(value: Date | null) {
    this._startAtDay = isNaN(Date.parse(value.toDateString()))  ? new Date()  : value;
  }
  private _startAtDay: Date = new Date();

  /* ====== OUTPUTS ================ */
  @Output()
  readonly  calendarDateChange:EventEmitter<AngularCalendarDateChange> = new EventEmitter();

  ngOnInit(){
    this._createStartEndDates(this.startAtDay);
  }

  ngOnDestroy(){
    this.dateData.complete();
  }

  @ContentChild(TemplateRef, {static:false}) dayTemplate: TemplateRef<any>;

  /* depending on current selectedView calculate start and end dates for that time period */
  private _createStartEndDates(date:Date){
    let startDate:Date;
    let endDate:Date;
    const year = date.getFullYear();
    // months are 0 based
    const month = date.getMonth();
    switch (this.selectedView) {
      case 'month':{
        const lastDayOfTheMonth = new Date(year, month + 1, 0).getDate();
         startDate = new Date(year, month);
         endDate = new Date(year, month, lastDayOfTheMonth);
      }
      break;
      case 'week':{
        const difference = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        startDate = new Date(year, month, difference);
        endDate = new Date (year, month, difference + 6)
      }
      break;
      case 'day':{
        startDate = new Date(date);
        endDate = startDate;
      }
      break;
    }
    this.dateData.next({
      startDate,
      endDate,
      timespan: this.selectedView
    })
  }



  handleDateChange(changeType: 'prev' |  'next'){
    // TODO
    // TODOOOO
    if(changeType === 'prev'){
       // this.calendarDateChange.emit(new AngularCalendarDateChange("01-12", "31-12", "day"))
    } else {

    }
  }
  /* On timespan label click set new timespan and recalculate dates */
  changeTimespan(e:AngularCalendarTimeSpan){
    this.selectedView = e;
    this._createStartEndDates(this.startAtDay);
  }
}
