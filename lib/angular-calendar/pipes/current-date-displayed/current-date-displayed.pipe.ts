import { Pipe, PipeTransform } from '@angular/core';
import { AngularDateConfig } from 'lib/angular-calendar/containers/angular-calendar/angular-calendar.component';

@Pipe({
    name: 'currentDateDisplayed'
})
export class CurrentDateDisplayed implements PipeTransform {

    transform(value: AngularDateConfig |  null):string {
        if(value){
            if(value.timespan === 'day'){
                return this._createDayString(value.endDate);
            } else {
                return `${this._createDayString(value.startDate)}-${this._createDayString(value.endDate)}` ;
            }
        }
        return '';
    }

    private _createDayString(val:Date):string{
        return `${val.getDate()}.${val.getMonth() + 1}.${val.getFullYear()}`;
    }

}