import { Injectable, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService implements OnInit {
  private pagination: {currentPage:number; pages:number; show:number; records:number; firstRow:number;} = {
    currentPage:1,
    pages:2,
    show:40,
    records:1,
    firstRow:0
  };

  paginatorEmitter = new EventEmitter();
  
  constructor(private ds: DataService) {}
  ngOnInit(){
    this.updatePagination();
    this.ds.dataChangedEmitter.subscribe(()=>{
      console.log('paginator sai');
      this.updatePagination();
    });
  }

  updatePagination(){
    console.log("update pagination");
    
    this.setRecords(this.ds.getLength());

  }

  resetPagination():void{
    this.pagination = {currentPage:1,pages:1,show:40,records:1,firstRow:0};
  }

  getPagination():{currentPage:number; pages:number; show:number; records:number; firstRow:number;}{
    return this.pagination;
  }

  setPagination(start: number = 1, records: number, show: number):void{
    this.pagination.currentPage = Number(start);
    this.pagination.show = Number(show);
    this.pagination.pages = Math.ceil(records / show);
    this.pagination.records = Number(records);
    if (this.pagination.currentPage*this.pagination.show > records) {
      this.pagination.currentPage = this.pagination.pages;
    }
    this.paginatorEmitter.emit();
  }

  setRecords(records:number){
    this.pagination.pages = Math.ceil(records / this.pagination.show);
    this.pagination.records = records;
    this.changePage(this.pagination.currentPage);
  }

  private setFirstRow(){
    this.pagination.firstRow = (this.pagination.currentPage-1)*this.pagination.show;
    this.paginatorEmitter.emit();
    console.log("first row set to: ",this.pagination.firstRow)
  }

  changeShowCount(show:number):void{
    const newPage =  Math.floor(this.pagination.firstRow/show)+1;

    this.pagination.show = show;
    this.pagination.pages = Math.ceil(this.pagination.records / show);
    
    this.changePage(newPage)
  }
  changePage(newPage){
    if (newPage < 1){
      newPage = 1;
    } else if (newPage > this.pagination.pages) {
      newPage = this.pagination.pages;
    }
    this.pagination.currentPage = newPage;
    this.setFirstRow();
  }
  toLastPage(){
    this.changePage(this.pagination.pages);
  }
  toFirstPage(){
    this.changePage(1);
  }
  toNextPage(){
    this.changePage(++this.pagination.currentPage);
  }
  toPreviousPage(){
    this.changePage(--this.pagination.currentPage);
  }
}
