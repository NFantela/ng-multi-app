import { Injectable, Inject } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

import { DOCUMENT } from '@angular/common';

import { Observable } from 'rxjs';

type HotkeyOptions = {
    element: any;
    keys: string;
}
/** Service using angular EventManager to create custom keyboard events */
@Injectable({ providedIn: 'root' })
export class HotkeysService {

    defaultOpts: Partial<HotkeyOptions> = {
        element: this._document
    }
        
    constructor(private eventManager: EventManager,
                @Inject(DOCUMENT) private _document: Document
            ) {}

   /**
    * Take in options ard return Observable with teardown logic
    * @param options - {element - defaults to document,  keys: key combo}
    */
    addKeyShortcut(options: Partial<HotkeyOptions>) {
        const mergedOptions = { ...this.defaultOpts, ...options };
        const event = `keydown.${mergedOptions.keys}`;

        return new Observable(observer => {
            const evHandler = (e) => {
                e.preventDefault()
                observer.next(e);
            };
            
            const disposeFn = this.eventManager.addEventListener(
                mergedOptions.element, event, evHandler
            );

            return () => {
                disposeFn();
            };
        });
    }
}