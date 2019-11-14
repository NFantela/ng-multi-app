import { Directive, ElementRef, ViewContainerRef, OnInit, Input } from "@angular/core";
import { FormControl } from  '@angular/forms';
import { TimepickerContainerComponent } from '../../containers/timepicker-container/timepicker-container.component';
import { coerceNumberProperty } from '../../coercion/coercion';
import { RiftConfig } from 'lib/rift/config/rift.config';
import { DomRiftService } from 'lib/rift/dom-rift.service';

export type DatepickerType = 'hours' | 'minutes' | 'seconds';
const INPUT_TYPES  = {
    text : 'text',
    number : 'number',
};

@Directive({
    selector: 'input[timepicker]',
    exportAs: 'timepickerDirective',
    host : {
        '(click)' :'handleOpenTimepicker($event)',
        '[class.timepicker-active]' : '_isOpen'
    }
}) export class TimepickerDirective implements OnInit {

    constructor(
        private _elRef: ElementRef, 
        private _vCRef:ViewContainerRef,
        private _riftService:DomRiftService){
           const element = this._elRef.nativeElement as HTMLInputElement;
           if(element && element.type !== INPUT_TYPES[element.type]){
               throw new Error("Sorry Invalid input type only text or number")
           } else {
             this._currentInputType = element.type;
           }
        }

        private _currentInputType: string;

        // set this instance type 'hours' | 'minutes' | 'seconds';
        @Input()
        set timepicker(v:DatepickerType){
            this._type = v;
        }
        private _type:DatepickerType;

        // if reactive forms are used
        @Input()
        set timepickerFieldControl(v:FormControl){
            this._fieldControl = v;
        }
        private _fieldControl:FormControl;
        
        get currentInputTime():number{
            return this._currentInputSelectedTime;
        }
        private _currentInputSelectedTime: number;

        // set current time based on form values at the start
        ngOnInit(){
            this._setCurrentTime();
        }

        // if there is NO Form Control patch input field value in the end

        handleOpenTimepicker(e:MouseEvent){
            const riftConfig: RiftConfig<TimepickerContainerComponent> = {
                riftClass: 'some',
                hasBackdrop: true,
                data: { type: this._type, currentTime:  this.currentInputTime},
                component: TimepickerContainerComponent,
                viewContainerRef: this._vCRef,
                elRef: this._elRef
            }
            const riftRef = this._riftService.createRift<TimepickerContainerComponent>(riftConfig);
            return riftRef.subscribe(c => {
                console.log("closing", c);
                if(c.data && c.data.timepickerTime){
                    this._setCurrentTime(c.data.timepickerTime);
                    this._patchFormValue();
                }
            })
        }
        // sets current time based on provided time or default values from form provided by this directive
        private _setCurrentTime(time:string | number = 0):void{
            let valToAssign:number; 
            if(this._fieldControl){
                (time) ?  valToAssign = coerceNumberProperty(time) : valToAssign = coerceNumberProperty(this._fieldControl.value);
            } else {
                (time) ?  valToAssign = coerceNumberProperty(time) : valToAssign = coerceNumberProperty(this._elRef.nativeElement.value);
            }
            this._currentInputSelectedTime = valToAssign;
        }

        // patches form values depending on result from riftRef
        private _patchFormValue(){
            // patch depending on _currentInputType
            const valueToPatch = (this._currentInputType === 'text') ? this._currentInputSelectedTime.toString() : this._currentInputSelectedTime ;
            if (this._fieldControl) {
                this._fieldControl.setValue(valueToPatch);
            } else {
                this._elRef.nativeElement.value = valueToPatch;
            }
        }
        

}