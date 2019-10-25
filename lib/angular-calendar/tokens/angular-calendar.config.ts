import { InjectionToken } from "@angular/core";

export interface AngularCalendarConfig {
    labels : {
        daily : string;
        weekly: string;
        monthly : string;
        weekDays: [
            {monday: string;},
            {tuesday: string;},
            {wednesday: string;},
            {thursday: string;},
            {friday: string;},
            {saturday: string;},
            {sunday: string;}
        ]
    }
}

export const ANGULAR_CALENDAR_CONFIG = new InjectionToken<AngularCalendarConfig>('ANGULAR_CALENDAR_CONFIG');