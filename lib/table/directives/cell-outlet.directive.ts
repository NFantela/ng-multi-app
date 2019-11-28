import { Directive, OnDestroy, ViewContainerRef } from '@angular/core';
import { AnCellDef } from './column.directives';

@Directive({selector: '[anCellOutlet]'})
export class AnCellOutlet implements OnDestroy {
  /** The ordered list of cells to render within this outlet's view container */
  cells: AnCellDef[];

  /** The data context to be provided to each cell */
  context: any;

  /**
   * Static property containing the latest constructed instance of this class.
   * Used by the An table when each AnHeaderRow and AnRow component is created using
   * createEmbeddedView. After one of these components are created, this property will provide
   * a handle to provide that component's cells and context. After init, the AnCellOutlet will
   * construct the cells with the provided context.
   */
  static mostRecentCellOutlet: AnCellOutlet|null = null;

  constructor(public _viewContainer: ViewContainerRef) {
    AnCellOutlet.mostRecentCellOutlet = this;
  }

  ngOnDestroy() {
    // If this was the last outlet being rendered in the view, remove the reference
    // from the static property after it has been destroyed to avoid leaking memory.
    if (AnCellOutlet.mostRecentCellOutlet === this) {
      AnCellOutlet.mostRecentCellOutlet = null;
    }
  }
}