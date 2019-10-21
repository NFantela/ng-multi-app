import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'angular-calendar',
    styleUrls: ['../../shared/scss/angular.calendar.scss', 'angular-calendar.component.scss'],
    templateUrl: 'angular-calendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularCalendarComponent {

    constructor() {
    }

  /* ====== INPUTS ======== */

  /** Set the start view or default */
  @Input() startView: 'day' | 'week' | 'month' = 'month';

  @Input() primaryColor:string = '#114a9f';

  /** The date to open the calendar to initially. */
  @Input()
  get startDay(): Date | null {
    return this._startDay;
  }
  set startDay(value: Date | null) {
    this.startDay = value || new Date();
  }
  private _startDay: Date | null;




}
