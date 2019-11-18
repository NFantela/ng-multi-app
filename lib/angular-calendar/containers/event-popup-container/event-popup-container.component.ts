import { Component, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';
import { DomRiftReference } from 'lib/rift/dom-rift.ref';

@Component({
    selector: 'event-popup-container',
    styleUrls: ['event-popup-container.component.scss'],
    templateUrl: 'event-popup-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPopupContainerComponent {

    eventTemplate:TemplateRef<any> = null;
    events:any[] = [];

    @Input()
    set domRiftRef(v:DomRiftReference){
        if(v){
            this._domRiftRef = v;
            this._configData = v.riftConfigData;
            if(this._configData){
                this.eventTemplate = this._configData.template;
                this.events = this._configData.events;
            }
        }
    };
    get domRiftRef():DomRiftReference{ return this._domRiftRef; }
    private _domRiftRef:DomRiftReference;

    private _configData:any;

    // selectTime(){
    //     this.domRiftRef.close({timepickerTime: this.timepickerTime});
    // }
}