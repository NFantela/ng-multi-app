import { Component, ChangeDetectionStrategy, AfterContentChecked, OnInit, OnDestroy, IterableDiffers, ChangeDetectorRef, ElementRef, Attribute, Optional, Inject, ViewChild, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DataRowOutlet, HeaderRowOutlet, FooterRowOutlet } from 'lib/table/directives/row.directives';

@Component({
    selector: 'ang-table table[ang-table]',
    styleUrls: ['table.component.scss'],
    template: `
        <ng-content select="caption"></ng-content><!-- caption has to always be first -->
        <ng-container headerRowOutlet></ng-container>
        <ng-container rowOutlet></ng-container>
        <ng-container footerRowOutlet></ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class TableComponent<T> implements AfterContentChecked, OnInit, OnDestroy{

    constructor(
        private readonly _differs: IterableDiffers,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _elementRef: ElementRef, 
        @Attribute('role') role: string, // collect attribubte role if any
        @Inject(DOCUMENT) _document: any) {
            if (!role) {
                this._elementRef.nativeElement.setAttribute('role', 'grid');
            }
        this._document = _document;
        this._isNativeHtmlTable = this._elementRef.nativeElement.nodeName === 'TABLE';
    }

    private _document: Document;
    private _isNativeHtmlTable: boolean;

    // Outlets in the table's template where the header, data rows, and footer will be inserted.
    @ViewChild(DataRowOutlet, {static: true}) rowOutlet: DataRowOutlet;
    @ViewChild(HeaderRowOutlet, {static: true}) headerRowOutlet: HeaderRowOutlet;
    @ViewChild(FooterRowOutlet, {static: true}) footerRowOutlet: FooterRowOutlet;

    /*========================= INPUTS ==============================*/
    @Input()
    get dataSource(): CdkTableDataSourceInput<T> {
      return this._dataSource;
    }
    set dataSource(dataSource: CdkTableDataSourceInput<T>) {
      if (this._dataSource !== dataSource) {
        this._switchDataSource(dataSource);
      }
    }
    private _dataSource: CdkTableDataSourceInput<T>;
    
    ngAfterContentChecked(): void {
        // TODO
    }
    ngOnInit(): void {
        // TODO
    }
    ngOnDestroy(): void {
        // TODO
    }

}