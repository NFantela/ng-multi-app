import { Directive, OnDestroy, ViewContainerRef } from '@angular/core';
import { CellDef } from './cell-directives';

/**
 * Outlet for rendering cells inside of a row or header row.
 */
@Directive({selector: '[cdkCellOutlet]'})
export class CdkCellOutlet implements OnDestroy {
  /** The ordered list of cells to render within this outlet's view container */
  cells: CellDef[];

  /** The data context to be provided to each cell */
  context: any;

  /**
   * Static property containing the latest constructed instance of this class.
   * Used by the CDK table when each CdkHeaderRow and CdkRow component is created using
   * createEmbeddedView. After one of these components are created, this property will provide
   * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
   * construct the cells with the provided context.
   */
  static mostRecentCellOutlet: CdkCellOutlet|null = null;

  constructor(public _viewContainer: ViewContainerRef) {
    CdkCellOutlet.mostRecentCellOutlet = this;
  }

  ngOnDestroy() {
    // If this was the last outlet being rendered in the view, remove the reference
    // from the static property after it has been destroyed to avoid leaking memory.
    if (CdkCellOutlet.mostRecentCellOutlet === this) {
      CdkCellOutlet.mostRecentCellOutlet = null;
    }
  }
}