import { Component, OnInit, HostListener, OnDestroy, AfterViewInit} from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
import { FilterService } from 'src/app/services/filter.service';
import { SortService } from 'src/app/services/sort.service';
import { PaginatorService } from 'src/app/services/paginator.service';
import { TableStateService } from 'src/app/services/table-state.service';

@Component({
  selector: 'app-data-paikka',
  templateUrl: './data-paikka.component.html',
  styleUrls: ['./data-paikka.component.css']
})
export class DataPaikkaComponent implements OnInit, AfterViewInit, OnDestroy {
  
  firstRow: number = 1;
  jarjestetty: string;
  reversed: boolean;

  constructor(
    private ds: DataService,
    private fs: FilterService,
    private ss: SortService,
    private ps: PaginatorService,
    private tss: TableStateService
    ) {}
  
  
  ngOnInit() {
    this.updateAll();
    this.ds.dataChangedEmitter.subscribe(() => {
      console.log('datapaikka sai');
      this.updateData();
    });
    this.ss.sortEmitter.subscribe(() => {
      this.updateSort();
    });
    this.ps.paginatorEmitter.subscribe(()=>{
      this.updateFirstRow();
    });
  }

  ngAfterViewInit(){
    document.getElementById("viewportdiv").scrollLeft = this.tss.tableScroll;
  }

  ngOnDestroy(){this.ps.resetPagination();}
  
  updateAll(){
    this.updateData();
    this.updateFirstRow();
    this.updateSort();
  }

  updateData(){
    // this.data = this.ds.getData();
    // this.otsikot = this.ds.getOtsikot();
  }

  updateFirstRow(){
    this.firstRow = this.ps.getPagination().firstRow;
  }
  updateSort(){
    this.jarjestetty = this.ss.getSortParams().sarake;
    this.reversed = this.ss.getSortParams().reversed;
  }

  
  get data() : object[] {
    return this.ds.getData();
  }

  get otsikot() : string[] {
    return this.ds.getOtsikot();
  }
  
  

  
  
  sortData(sarake: string) {
    console.log("Sortattava sarake:",sarake,"Reversed:", this.ss.getSortParams().reversed);
    this.ss.setSortParams(sarake);
  }
  


  offsetTop: number = undefined;
  setOffSetTopOnce(ost: number){
    if (this.offsetTop === undefined){
      this.offsetTop = ost + window.scrollY;
    }
    return this.offsetTop;
  }
  showSticky = false;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const theadElem: HTMLElement = document.getElementById("tablehead");
    const {y} = theadElem.getBoundingClientRect();
    const w = window.scrollY
    this.setOffSetTopOnce(y);
    if (w >= this.offsetTop) {
      this.showSticky = true;
    } else {
      this.showSticky = false;
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.offsetTop = undefined;
  }

  theadoffset: string = '0px';
  @HostListener('scroll', ['$event'])
  onTableScroll(event: Event) {
    const target = event.target as HTMLElement;
    this.theadoffset = -target.scrollLeft + 'px';
    this.tss.tableScroll = target.scrollLeft;
  }
  
  // tablepos: number = 0;
  // tablepospx: string = "px"
  // @HostListener('window:wheel', ['$event'])
  // onWheel(event: WheelEvent) {
  //   const x = event.deltaX;
  //   this.tablepos -= x;
  //   if (this.tablepos > 0){
  //     this.tablepos = 0;
  //   } else if (this.tablepos < document.body.scrollWidth-tableElem.scrollWidth) {
  //     this.tablepos = document.body.scrollWidth-tableElem.scrollWidth;
  //   }this.tablepospx = this.tablepos + 'px';
  // }
  // touchStart: number;
  // distancex: number = 0;
  // previousx: number;
  // @HostListener('window:touchstart', ['$event'])
  // onTouchStart(event: TouchEvent) {
  //   this.touchStart = event.targetTouches.item(0).screenX;
  //   this.previousx = 0;
  // }
  // @HostListener('window:touchmove', ['$event'])
  // onTouchMove(event: TouchEvent) {
  //   const x = event.touches.item(0).screenX - this.touchStart;
  //   const absMove = this.previousx - x;
  //   const tableElem: HTMLElement = document.getElementById("datataulu");
  //   this.tablepos -= absMove;
  //   if (this.tablepos > 0){
  //     this.tablepos = 0;
  //   } else if (this.tablepos < document.body.scrollWidth-tableElem.scrollWidth) {
  //     this.tablepos = document.body.scrollWidth-tableElem.scrollWidth;
  //   }
  //   this.tablepospx = this.tablepos + 'px';
  //   this.previousx = x;
  // }
}