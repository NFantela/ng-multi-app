import { Component, ChangeDetectionStrategy, Input, ContentChild, TemplateRef, EventEmitter, Output, Inject, Optional, OnDestroy, OnInit } from '@angular/core';
import { ANGULAR_CALENDAR_CONFIG, AngularCalendarConfig } from 'lib/angular-calendar/tokens/angular-calendar.config';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, filter, } from 'rxjs/operators';
import { AngularCalendarData } from 'lib/angular-calendar/models/angular-calendar-data';

export interface AngularDateConfig  {
   startDate: Date;
   endDate:Date;
   timespan:AngularCalendarTimeSpan
}

export class AngularCalendarCell {
  constructor(public value: number,
              public displayValue: string, /* e.g. monday */
              public ariaLabel: string,
              public enabled: boolean) {}
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

    constructor(
        @Optional() @Inject(ANGULAR_CALENDAR_CONFIG) private _injectedConfig : AngularCalendarConfig ) {
        this.configOptions = new AngularCalendarConfig();
        if(this._injectedConfig){
          this.configOptions = {...this.configOptions, ..._injectedConfig};
        }
    }

    configOptions:AngularCalendarConfig;
    /* Main date config Subject */
    dateData:BehaviorSubject<AngularDateConfig> = new BehaviorSubject(null);
    dateData$:Observable<AngularDateConfig | null> = this.dateData.asObservable().pipe(
        filter(dateData => !!dateData),
        tap(({startDate, endDate, timespan}) => {
          this.calendarDateChange.emit(new AngularCalendarDateChange(startDate, endDate, timespan));
        })
      );
    

    get timespanLabels(){return this.configOptions.timespanLabels;}

    // current day
    private readonly _today = new Date();

  /* ====== INPUTS ================ */

   // TODO we need real events here
  @Input()
  eventData:AngularCalendarData<any>[] = [];
  /* To display loading indicator on calendar maybe let template be passed from config? */ 
  @Input()
  loadingData = false;

  /** Set the start view or default */
  @Input() 
  set selectedView(v: AngularCalendarTimeSpan ){
    if(v && v === 'day' || v === 'month' || v === 'week' ){
      this._selectedView = v;
    } 
  } 
  get selectedView(){return this._selectedView;}
  _selectedView:AngularCalendarTimeSpan = 'month';

  /* Color used for primary elements e.g. arrows */
  @Input() primaryColor:string = '#114a9f';

  /** The date to open the calendar to initially. */
  @Input()
  get startAtDay(): Date | null {
    return this._startAtDay;
  }
  set startAtDay(value: Date | null) {
    this._startAtDay = isNaN(Date.parse(value.toDateString()))  ? new Date()  : value;
  }
  private _startAtDay: Date = new Date();

  /* used when navigating calendar will be mutated */
  private _currentTrackedDay:Date;


  /* ====== OUTPUTS ================ */
  @Output()
  readonly  calendarDateChange:EventEmitter<AngularCalendarDateChange> = new EventEmitter();

  ngOnInit(){
    this._createStartEndDates(this.startAtDay);
    this._currentTrackedDay = new Date(this._startAtDay); //  by now the date should be set or received via input
  }

  ngOnDestroy(){
    this.dateData.complete();
  }

  @ContentChild(TemplateRef, {static:false}) dayTemplate: TemplateRef<any>;

  /* depending on current selectedView calculate start and end dates for that time period */
  private _createStartEndDates(date:Date){
    console.log(date)
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
    });
  }


  /* On toggling calendar arrows calculate next timespan */
  handleDateChange(changeType: 'prev' |  'next'){
    if(changeType === 'prev'){
      this._calculateNewDateOnArrowsClick('prev');
      return this._createStartEndDates(this._currentTrackedDay);
    } else {
      // next section
        this._calculateNewDateOnArrowsClick('next');
        return this._createStartEndDates(this._currentTrackedDay);
    }
  }

  /* On timespan label click set new timespan and recalculate dates */
  changeTimespan(e:AngularCalendarTimeSpan){
    this.selectedView = e;
    this._currentTrackedDay = new Date(this.startAtDay);
    this._createStartEndDates(this.startAtDay);
  }
  /* Used in handleDateChange() calculates new date for _currentTrackedDay */
  private _calculateNewDateOnArrowsClick(change:'prev' |  'next'){
    if(this.selectedView === 'day'){
      this._currentTrackedDay = new Date(this._currentTrackedDay.setDate(
        (change==='prev') ? this._currentTrackedDay.getDate() - 1 : this._currentTrackedDay.getDate() + 1 )
      );
    }
    if(this.selectedView === 'week'){
      this._currentTrackedDay = new Date(this._currentTrackedDay.setDate(
        (change==='prev') ? this._currentTrackedDay.getDate() - 7 : this._currentTrackedDay.getDate() + 7 )
      );
    }
    if(this.selectedView === 'month'){
      const maxDaysInCurrentMonth = new Date(this._currentTrackedDay.getFullYear(), this._currentTrackedDay.getMonth(), 0).getDate();
      this._currentTrackedDay = new Date(this._currentTrackedDay.setDate( (change==='prev') ? -1 : maxDaysInCurrentMonth + 2 )   );
    }      
  }


}
