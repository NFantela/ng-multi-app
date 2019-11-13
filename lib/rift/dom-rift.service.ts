import { Injectable, ApplicationRef, Inject, NgZone, Injector, ComponentFactoryResolver } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomRiftRef } from './dom-rift.ref';
import { RiftConfig } from './config/rift.config';
import { Observable } from 'rxjs';

let nextUniqueId = 0;

@Injectable()
export class DomRiftService {
    constructor(
        @Inject(DOCUMENT) private _document: any,
        private _injector: Injector,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _ngZone: NgZone,
        private _appRef: ApplicationRef
    ) { 
        this._createContainerElement();
    }

    // make sure to get appRef later when creating components
    private _containerElement: HTMLElement;
    private _riftSpawnElement:HTMLElement; /*  inside this the items will apear */

    /* 
    * Mother of method will basicaly boostrap everything 
    */
    createRift<C>(config:RiftConfig<C>):Observable<any> {
        // 1 - create container element e.g. rift-container
        const hostEl = this._createHostElement();
        // 2 - rift spawn element
        const riftSpawnEl = this._createRiftSpawnsElement(hostEl);
        // 3- create config 
        const riftConfig  = new RiftConfig<C>(config);
        // 4- create rift Ref and return it he takes over

        const riftRef = new DomRiftRef<C>(
            hostEl, riftSpawnEl, 
            this._document, this._ngZone, this._componentFactoryResolver,
            this._appRef, this._injector,  riftConfig
        );

        riftRef.attachToRift();

        // TODO RETURN RIFT FOR RESULT SUB
        return riftRef.afterClosed$;
    }

    getContainerElement(): HTMLElement {
        if (!this._containerElement) { this._createContainerElement() }
        return this._containerElement;
    }

    private _createHostElement(): HTMLElement {
        const host = this._document.createElement('div');
        this.getContainerElement().appendChild(host);
        return host;
      }

    // create master container component
    _createContainerElement(): void {
        const containerElement = this._document.createElement('div');
        containerElement.classList.add('rift-container');
        this._document.body.appendChild(containerElement);
        this._containerElement = containerElement;

        return containerElement;
    }

    _createRiftSpawnsElement(host:HTMLElement){
        const riftSpawn = this._document.createElement('div');
        riftSpawn.id = `rift-spawns-${nextUniqueId++}`;
        riftSpawn.classList.add('rift-spawns');
        this._riftSpawnElement = riftSpawn;
        host.appendChild(riftSpawn);
        return riftSpawn;
    }


}