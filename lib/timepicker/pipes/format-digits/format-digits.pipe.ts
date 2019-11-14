import { Pipe, PipeTransform } from '@angular/core';
import { DatepickerType } from '../../directives/timepicker/timepicker.directive';

@Pipe({
    name: 'formatDigits'
})
export class FormatDigitsPipe implements PipeTransform {
    transform(value: number, type:DatepickerType = 'hours', byTen:boolean = false) {
      if(typeof value !== 'number'){
          return value;
      }
      // 1 in case of hours we are done
      if(type === 'hours'){
          return value;
      } else {
        // 2 in case of minutes or seconds
        // 2.1. in case of 0-9 seconds / minutes
        if(value < 10){
           return (byTen) ? 0 : value;
        } else {
          // 2.2. the value is more than 10
          return this._extractNum(value, byTen);
        }
      }

    }

    private _extractNum(val:number, byTen:boolean){
      const stringed = val.toString();
      
      return (byTen) ? parseInt(`${stringed[0]}0`, 10) : parseInt(`${stringed[1]}`, 10);
    }

}