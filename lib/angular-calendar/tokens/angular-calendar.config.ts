import { InjectionToken } from "@angular/core";
// TODO SWITCH THIS TO CLASS AND LET IT HAVE DEFAULT OPTIONS THAT CAN BE MERGED WITH MATERIAL
/* 

   * Expands the provided configuration object to include the default values for properties which
   * are undefined.

  private _applyConfigDefaults(config?: DialogConfig): DialogConfig {
    const dialogConfig = this._injector.get(DIALOG_CONFIG) as typeof DialogConfig;
    return {...new dialogConfig(), ...config};
  }

   */


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