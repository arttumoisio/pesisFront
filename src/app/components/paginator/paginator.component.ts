import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginatorService } from 'src/app/services/paginator.service';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnDestroy {
  currentPage: number = 1;
  pages: number = 1;
  show: number = 40;
  records: number;
  showArray: number[] = [5, 10, 20, 25, 40, 50, 100]
  

  constructor(
    private ps:PaginatorService,
    private ds:DataService) {
      this.update();
    }

  ngOnInit(): void {
    this.update();
    this.ps.paginatorEmitter.subscribe(()=>{
      this.update();
    });
  }

  ngOnDestroy():void{
    this.ps.changePage(1);
  }

  update(){
    const pagination = this.ps.getPagination();
    this.currentPage = pagination.currentPage;
    this.pages = pagination.pages;
    this.show = pagination.show;
    this.records = pagination.records;
  }

  onNextPage(){
    this.ps.toNextPage();
  }
  
  onPreviousPage(){
    this.ps.toPreviousPage();
  }
  onFirstPage(){
    this.ps.toFirstPage();
  }
  onLastPage(){
    this.ps.toLastPage();
  }

  changePage(newPage){
    this.ps.changePage(newPage);
  }

  changeShowCount(newShowCount){
    this.ps.changeShowCount(newShowCount);
  }

}
