### TABLE EXAMPLE

<table table [dataSource]="dataSource" class="whatever">

  <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

  <!-- Position Column -->
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef> No. </th>
    <td mat-cell *matCellDef="let element"> {{element.position}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

-------------------------------------------------------------------------
### MY VERSION 

## Description
#  CELL
 1) an-header-cell, an-footer-cell, an-cell, - DIRECTIVES used to apply correct CSS classes to their native element

 2) anColumnDef - DIRECTIVE is basicaly a parent to AnCellDef, AnheaderCell, AnFooterCellDef - they all access him to get cssClassFriendlyName and apply it to its element

 3) *anCellDef, *anHeaderCellDef, *anFooterCellDef - DIRECTIVES are used to expose their <ng-template> TemplateRef<any> and accept context & other data;

# ROW
4) rowOutlet, headerRowOutlet, footerRowOutlet DIRECTIVES - used in table template to grab <ng-containers> to insert rows

5) anHeaderRowDef, anFooterRowDef - they have columns: Iterable<string> - store IterableDiffer and can check anColumnDef (header / footer / cell)
    - andRowDef  -Captures the header row's template and other row properties such as the columns to display and a when predicate that describes when this row should be used.

<!-- Table is component containeing 
        <ng-content select="caption"></ng-content>
        <ng-container headerRowOutlet></ng-container>
        <ng-container rowOutlet></ng-container>
        <ng-container footerRowOutlet></ng-container>
-->
<table ang-table [dataSource]="dataSource" class="whatever"> 

  <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

  <ng-container anColumnDef="position">
    <th an-header-cell *anHeaderCellDef> No. </th>
    <td an-cell *anCellDef="let element"> {{element.position}} </td>
  </ng-container>

<!-- Borh header-row & row are components whose templaet is <ng-container anCellOutlet></ng-container>-->
  <tr header-row *anHeaderRowDef="displayedColumns"></tr> <!-- anHeaderRowDef captures -->
  <tr row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>