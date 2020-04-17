import { Injectable} from '@angular/core';
import { DataService } from './dataservice.service';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  private pagination: {currentPage: number; pages: number; show: number; records: number; firstRow: number; } = {
    currentPage: 1,
    pages: 1,
    show: 20,
    records: 0,
    firstRow: 0,
  };

  constructor(private ds: DataService) {
    this.setRecords(this.ds.getLength());
  }

  updatePagination() {
    this.setRecords(this.ds.getLength());
  }

  resetPagination(): void {
    this.pagination = {currentPage: 1, pages: 1, show: this.pagination.show, records: 1, firstRow: 0};
    this.update();
  }

  getPagination(): {currentPage: number; pages: number; show: number; records: number; firstRow: number; } {
    return this.pagination;
  }

  private update() {
    this.pagination = {...this.pagination};
  }

  setPagination(start: number = 1, records: number, show: number): void {
    this.pagination.currentPage = Number(start);
    this.pagination.show = Number(show);
    this.pagination.pages = Math.ceil(records / show);
    this.pagination.records = Number(records);
    if (this.pagination.currentPage * this.pagination.show > Number(records)) {
      this.pagination.currentPage = this.pagination.pages;
    }
    this.update();
  }

  setRecords(records: number): void {
    if (Number(records) === this.pagination.records) {return; }
    this.pagination.pages = Math.ceil(records / this.pagination.show);
    this.pagination.records = Number(records);
    this.changePage(this.pagination.currentPage);
  }

  private setFirstRow() {
    this.pagination.firstRow = (this.pagination.currentPage - 1) * this.pagination.show;
    this.update();
  }

  changeShowCount(show: number): void {
    show = Number(show);
    const newPage =  Math.floor(this.pagination.firstRow / show) + 1;

    this.pagination.show = show;
    this.pagination.pages = Math.ceil(this.pagination.records / show);

    this.changePage(newPage);
  }
  changePage(newPage) {
    newPage = Number(newPage);
    if (newPage < 1) {
      newPage = 1;
    } else if (newPage > this.pagination.pages) {
      newPage = this.pagination.pages;
    }
    this.pagination.currentPage = newPage;
    this.setFirstRow();
  }
  toLastPage() {
    this.changePage(this.pagination.pages);
  }
  toFirstPage() {
    this.changePage(1);
  }
  toNextPage() {
    this.changePage(++this.pagination.currentPage);
  }
  toPreviousPage() {
    this.changePage(--this.pagination.currentPage);
  }
}
