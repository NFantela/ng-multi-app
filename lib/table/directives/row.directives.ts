import { Directive, ViewContainerRef, ElementRef } from '@angular/core';

interface RowOutlet {
    viewContainer: ViewContainerRef;
}

@Directive({selector: '[rowOutlet]'})
export class DataRowOutlet implements RowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

@Directive({selector: '[headerRowOutlet]'})
export class HeaderRowOutlet implements RowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

@Directive({selector: '[footerRowOutlet]'})
export class FooterRowOutlet implements RowOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}
