import { Directive, ViewContainerRef, ElementRef } from '@angular/core';

interface RowOutlet {
    viewContainer: ViewContainerRef;
}
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 */
@Directive({selector: '[rowOutlet]'})
export class DataRowOutlet implements RowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 */
@Directive({selector: '[headerRowOutlet]'})
export class HeaderRowOutlet implements RowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

/**
 * Provides a handle for the table to grab the view container's ng-container to insert the footer.
 */
@Directive({selector: '[footerRowOutlet]'})
export class FooterRowOutlet implements RowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}