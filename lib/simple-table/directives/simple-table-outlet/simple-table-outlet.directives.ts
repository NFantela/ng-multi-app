import { Directive, ViewContainerRef, ElementRef } from '@angular/core';

@Directive({selector: '[simpleTableRowOutlet]'})
export class SimpleTableDataRowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

@Directive({selector: '[simpleTableHeaderRowOutlet]'})
export class SimpleTableHeaderRowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

@Directive({selector: '[simpleTableFooterRowOutlet]'})
export class SimpleTableFooterRowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}