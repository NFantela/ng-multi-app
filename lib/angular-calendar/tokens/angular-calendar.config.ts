import { InjectionToken } from "@angular/core";

export class AngularCalendarConfig {

  timespanLabels = {
    daily : 'daily',
    weekly: 'weekly',
    monthly : 'monthly'
  }

  weekDayLabels = [
    {monday: 'monday'},
    {tuesday: 'tuesday'},
    {wednesday: 'wednesday'},
    {thursday: 'thursday'},
    {friday: 'friday'},
    {saturday: 'saturday'},
    {sunday: 'sunday'}
  ];

}

export const ANGULAR_CALENDAR_CONFIG = new InjectionToken<AngularCalendarConfig>('ANGULAR_CALENDAR_CONFIG');