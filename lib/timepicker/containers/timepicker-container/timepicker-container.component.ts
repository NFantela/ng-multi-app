import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DatepickerType } from '../../directives/timepicker/timepicker.directive';
import { ChangeTimepickerTime } from '../../components/timepicker-flipper/timepicker-flipper.component';
import { DomRiftReference } from 'lib/rift/dom-rift.ref';

@Component({
    selector: 'timepicker-container',
    styleUrls: ['timepicker-container.component.scss'],
    template: `
        <div class="timepicker-container animated zoomIn">
            <section 
                *ngIf="type === 'hours'; else minutesOrSeconds"
                class="timepicker-section">
                    <div class="timepicker__heading">
                        {{ type | uppercase }}
                    </div>
                    <timepicker-flipper
                        [type]="type"
                        [timepickerTime]="timepickerTime"
                        (clickedChangeTime)="handleChangeTime($event)">
                    </timepicker-flipper>

            </section>
            <ng-template #minutesOrSeconds>
                <section class="timepicker-section">
                    <div class="timepicker__heading">
                        {{ type | uppercase }}
                    </div>                    
                    <timepicker-flipper
                        [type]="type"
                        [byTen]="true"
                        [timepickerTime]="timepickerTime"
                        (clickedChangeTime)="handleChangeTime($event)">
                    </timepicker-flipper>
                        <div class="timepicker__separator">
                            <span>:</span>
                        </div>
                    <timepicker-flipper
                        [type]="type"
                        [timepickerTime]="timepickerTime"
                        (clickedChangeTime)="handleChangeTime($event)">
                    </timepicker-flipper>
                </section>
            </ng-template>

           <div class="timepicker-confirm">
                <button type="button" (click)="selectTime()">Confirm</button>
           </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimepickerContainerComponent {


    @Input()
    set domRiftRef(v:DomRiftReference){
        if(v){
            this._domRiftRef = v;
            this._configData = v.riftConfigData;
            if(this._configData){
                this.type = this._configData.type;
                this.timepickerTime = this._configData.currentTime
            }
        }
    };
    get domRiftRef():DomRiftReference{
        return this._domRiftRef;
    }
    private _domRiftRef:DomRiftReference;

    private _configData:any; // fix this to be a mix of DatepickerType and previous value and step

    type:DatepickerType = 'hours';
    step = 0;
    timepickerTime = 0;


    selectTime(){
        this.domRiftRef.close({timepickerTime: this.timepickerTime});
    }

    handleChangeTime({changeType, byTen}: {changeType:ChangeTimepickerTime, byTen:boolean}){
        if(changeType === 'increment'){
            (byTen) ? this._modifyTimeProp(10) : this._modifyTimeProp(1) ;

        } else {
            (byTen) ? this._modifyTimeProp(-10) : this._modifyTimeProp(-1) ;
        }
    }

    private _modifyTimeProp(val:number){
        const newTime = this.timepickerTime + val;
        // TODO HERE
        // 1 firure if we are modifying hours  | minutes | seconds
        if(this.type === 'hours'){
            if(newTime > 24){
                return this.timepickerTime = 1;
            }
            if(newTime< 1){
                return this.timepickerTime = 24;
            }
        } else {
            // minutes or seconds follow same 0 - 59 rules
            if(newTime > 59){
                return this.timepickerTime = 0;
            }
            if(newTime < 1){
                return this.timepickerTime = 59;
            }
        }
        return this.timepickerTime = newTime;
    }



}