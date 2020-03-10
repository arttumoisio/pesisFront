import { Component, OnInit } from '@angular/core';
import { PaginatorService } from 'src/app/services/paginator.service';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  records: number;
  paginationStart: number = 1;
  show: number = 100;
  pages: number;
  showArray: number[] = [5, 10, 20, 25, 50, 100]
  

  constructor(private dataService: DataService) {
    this.updateAll()
    dataService.dataChangedEmitter.subscribe(()=>{
      this.updateAll();
      
    });
   }

  ngOnInit(): void {
  }

  updateAll(){
    this.records = this.dataService.getLength();
    this.pages = Math.ceil(this.records / this.show);
    this.dataService.setPagination(this.paginationStart,this.pages,this.show);

  }

  onNextPage(){
    this.paginationStart++;
    if (this.paginationStart>this.pages){
      this.paginationStart = this.pages;
    }
    this.updateAll();
  }
  
  onPreviousPage(){
    this.paginationStart--;
    if (this.paginationStart<1){
      this.paginationStart = 1;
    }
    this.updateAll();
  }
  onFirstPage(){
    this.paginationStart = 1;
    this.updateAll();
  }
  onLastPage(){
    this.paginationStart = this.pages;
    this.updateAll();
  }

  changePage(newPage){
    if (newPage < 1){
      this.paginationStart = 1;
    } else if (newPage > this.pages) {
      this.paginationStart = this.pages;
    } else {
      this.paginationStart = newPage;
    }
    this.updateAll();
    console.log(this.paginationStart)
    console.log(this.pages)
    console.log(this.show)
    
  }

  changeShowCount(newShowCount){
    this.show = newShowCount;
    this.updateAll();
  }

}