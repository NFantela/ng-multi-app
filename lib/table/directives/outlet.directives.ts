import { Directive, ViewContainerRef, ElementRef } from '@angular/core';

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 */
@Directive({selector: '[anRowOutlet]'})
export class AnDataRowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

@Directive({selector: '[anHeaderRowOutlet]'})
export class AnHeaderRowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

@Directive({selector: '[anFooterRowOutlet]'})
export class AnFooterRowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}