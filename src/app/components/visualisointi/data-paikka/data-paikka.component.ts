import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { DataService } from '../../../services/dataservice.service';
import { FilterService } from '../../../services/filter.service';
import { PaginatorService } from '../../../services/paginator.service';
import { SortService } from '../../../services/sort.service';
import { TableStateService } from '../../../services/table-state.service';

@Component({
  selector: 'app-data-paikka',
  templateUrl: './data-paikka.component.html',
  styleUrls: ['./data-paikka.component.css'],
})
export class DataPaikkaComponent implements AfterViewInit, OnDestroy {

  // data : object[];
  // filters;
  // pagination;
  get data(): object[] {return this.ds.getData(); }
  get filters() {return this.fs.getFilters(); }
  get pagination() {return this.ps.getPagination(); }
  get jarjestetty(): string {return this.ss.getSortParams().sarake; }
  get reversed(): boolean {return this.ss.getSortParams().reversed; }
  get otsikot(): string[] {return this.ds.getOtsikot(); }
  get firstRow() {return this.ps.getPagination().firstRow; }

  theadoffset: string = '0px';
  showSticky = false;
  offsetTop: number = undefined;

  // subscriptions: Subscription[];

  constructor(
    private ds: DataService,
    private fs: FilterService,
    private ss: SortService,
    private ps: PaginatorService,
    private tss: TableStateService,
    ) {
      // this.data = this.ds.getData();
      // this.subscriptions.push(this.ds.dataChangedEmitter.subscribe(()=>{
      //   this.data = this.ds.getData();
      // }));
  }

  ngAfterViewInit() {
    document.getElementById('viewportdiv').scrollLeft = this.tss.tableScroll;
  }

  ngOnDestroy() {
    this.ps.resetPagination();
    // this.subscriptions.map(elem=>elem.unsubscribe());
  }

  sortData(sarake: string) {
    // console.log("Sortattava sarake:",sarake,"Reversed:", this.ss.getSortParams().reversed);
    this.ss.setSortParams(sarake);
  }
  setOffSetTopOnce(ost: number) {
    // if (this.offsetTop === undefined){
    //   this.offsetTop = ost + window.scrollY;
    // }
    this.offsetTop = ost + window.scrollY;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // console.log("windowscroll");

    const theadElem: HTMLElement = document.getElementById('tablehead');
    const {y} = theadElem.getBoundingClientRect();
    const w = window.scrollY;
    this.setOffSetTopOnce(y);
    this.showSticky = w >= this.offsetTop;
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.offsetTop = undefined;
  // }

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
