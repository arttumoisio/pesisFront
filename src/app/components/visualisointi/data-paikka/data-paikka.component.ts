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
  host: {
    class: 'customComponent',
  },
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
    const lastColWidth: number = document.getElementById('viimeinen').scrollWidth;
    // console.log(lastColWidth);
    document.getElementById('viimeinenotsikko').style.minWidth = `${lastColWidth}px`;

    // console.log(document.getElementById('bodyscroll').scrollLeft);
    document.getElementById('bodyscroll').scrollLeft = this.tss.tableScroll;
    // console.log(this.tss.tableScroll);
    // console.log(document.getElementById('bodyscroll').scrollLeft);
  }

  // get tableScroll(): number {
  //   console.log(this.tss.tableScroll);

  //   return this.tss.tableScroll;
  // }

  setScroll(scroll: number) {
    this.tss.tableScroll = scroll;
    // console.log(scroll);
  }

  ngOnDestroy() {
    this.ps.resetPagination();

    // console.log('on destroy', this.tss.tableScroll);
    
    // this.tss.tableScroll = document.getElementById('bodyscroll').scrollLeft;
    // this.subscriptions.map(elem=>elem.unsubscribe());
  }

  sortData(sarake: string) {
    // console.log("Sortattava sarake:",sarake,"Reversed:", this.ss.getSortParams().reversed);
    this.ss.setSortParams(sarake);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    console.log(event.type);
    console.log(typeof(event));

    // console.log("windowscroll");

    const tbodyDiv: HTMLElement = document.getElementById('bodyscroll');
    const {x, y} = tbodyDiv.getBoundingClientRect();
    const w = window.scrollY;
  }
}
