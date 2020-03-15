import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginatorService } from 'src/app/services/paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnDestroy {
  
  showArray: number[] = [5, 10, 20, 25, 40, 50, 100]
    get currentPage(): number {return this.ps.getPagination().currentPage;}
    get pages(): number {return this.ps.getPagination().pages;}
    get show(): number {return this.ps.getPagination().show;}
    get records(): number {return this.ps.getPagination().records;}
  
  constructor(private ps:PaginatorService) {
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy():void{
    this.ps.changePage(1);
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
