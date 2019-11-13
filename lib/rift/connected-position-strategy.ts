import { ElementRef } from '@angular/core';
import { DomRiftRef } from './dom-rift.ref';

interface Point {
    x: number;
    y: number;
}

function extendStyles(dest: CSSStyleDeclaration, source: CSSStyleDeclaration): CSSStyleDeclaration {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
  
    return dest;
}

export class ConnectedPositionStrategy {

    constructor(
        private _origin,
        private _document: Document) {
    }


    attach(riftRef: DomRiftRef<any>) {
        this._setOverlayElementStyles(riftRef.riftSpawn);
    }

  /** Sets positioning styles to the overlay element. */
  private _setOverlayElementStyles(riftSpawn:HTMLElement): void {
    const styles = {} as CSSStyleDeclaration;

    let rifthHeight:number;
    if (riftSpawn instanceof ElementRef) {
        rifthHeight =  riftSpawn.nativeElement.getBoundingClientRect().height;
    } else {
        rifthHeight = riftSpawn.getBoundingClientRect().height;
    }

    const originalElData =this._getOriginRect();

    let yCoords:number;
    const viewPortData = this._getViewportData();
    yCoords = originalElData.bottom;

    // need to get 
    if((viewPortData.size - originalElData.bottom) < rifthHeight){
        yCoords = originalElData.top - (rifthHeight + 120);
    } else {
        yCoords = originalElData.bottom;
    }

    let transformString = '';
    transformString += `translateX(${originalElData.left}px) `;
    transformString += `translateY(${yCoords}px) `;

    styles.transform = transformString.trim();

    extendStyles(riftSpawn.style, styles);
  }

    /** Returns the ClientRect of the current origin. */
    private _getOriginRect(): ClientRect {
        const origin = this._origin;
        if (origin instanceof ElementRef) {
            return origin.nativeElement.getBoundingClientRect();
        }
        if (origin instanceof HTMLElement) {
            return origin.getBoundingClientRect();
        }
    }

    // get current document scroll location
    private _getViewportData(): { top: number; left: number; size:number;} {

        const documentElement = this._document.documentElement!;
        const documentRectangle = documentElement.getBoundingClientRect();

        const top = -documentRectangle.top || document.body.scrollTop ||
            window.scrollY || documentElement.scrollTop || 0;

        const left = -documentRectangle.left || document.body.scrollLeft
            || window.scrollX || documentElement.scrollLeft || 0;

        return { top, left, size: documentRectangle.bottom };
    }

}