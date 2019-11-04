import { Component , ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
    selector: 'table-weekdays-heading',
    templateUrl: 'table-weekdays-heading.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableWeekdaysHeadingComponent {
    constructor() {}

    @Input()
    set labels(val: Array<{[key:string]: string}> ){
        if(val && val.length){
            this._generateLabels(val);
        }
    }

    labelsForDays:string[]=[];

    private _generateLabels(val:Array<{[key:string]: string}>){
        val.forEach(labelObj => {
           const label =  Object.keys(labelObj)[0];
           if(label){
               this.labelsForDays.push(labelObj[label]);
           }
        })
    }
}