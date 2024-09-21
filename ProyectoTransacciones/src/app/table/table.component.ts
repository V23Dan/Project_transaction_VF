import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatPaginator,
    MatPaginatorModule,
  ],
  templateUrl: './table.component.html',
  styles: ``,
})
export default class TableComponent implements OnInit {
  @Input() columns: Array<{ header: string; field: string }> = [];
  private _data: any[] = [];
  @Input()
  set data(value: any[]) {
    this._data = value;
    this.paginateData(); // Llamamos a la paginación cada vez que los datos cambian
  }
  get data(): any[] {
    return this._data;
  }

  paginatedData: any[] = [];
  pageSize = 5;
  currentPage = 0;
  filterText: string = ''; // Nueva propiedad para almacenar el texto del filtro

  ngOnInit() {
    this.paginateData(); // Aseguramos la paginación al iniciar
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateData();
  }

  onFilterChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.filterText = inputElement.value.toLowerCase();
      this.paginateData();
    }
  }

  private paginateData() {
    const filteredData = this._data.filter((item) =>
      this.columns.some((column) =>
        item[column.field]?.toString().toLowerCase().includes(this.filterText)
      )
    );

    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = filteredData.slice(startIndex, endIndex);
  }
}
