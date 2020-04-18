import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../../services/dataservice.service';
import { SortService } from '../../../services/sort.service';
import { TableStateService } from '../../../services/table-state.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IPaginationState } from '../../../store/state/pagination.state';
import * as PaginationActions from '../../../store/actions/pagination.actions';
import { IFilterState } from '../../../store/state/filters.state';

@Component({
  selector: 'app-data-paikka',
  templateUrl: './data-paikka.component.html',
  styleUrls: ['./data-paikka.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class DataPaikkaComponent implements OnInit, AfterViewInit, OnDestroy {

  // data : object[];
  // filters;
  // pagination;
  get data(): object[] {return this.ds.getData(); }
  // get filters() {return this.fs.getFilters(); }

  // get pagination() {return this.ps.getPagination(); }
  pagination: Observable< IPaginationState >;
  filters: Observable< IFilterState >;

  get jarjestetty(): string {return this.ss.getSortParams().sarake; }
  get reversed(): boolean {return this.ss.getSortParams().reversed; }
  get otsikot(): string[] {return this.ds.getOtsikot(); }

  theadoffset: string = '0px';
  showSticky = false;
  offsetTop: number = undefined;

  subscriptions: Subscription[] = [];

  constructor(
    private ds: DataService,
    private ss: SortService,
    private tss: TableStateService,
    private store: Store<{
      pagination: IPaginationState,
      filters: IFilterState,
     }>,
    ) {

      // this.data = this.ds.getData();
      // this.subscriptions.push(this.ds.dataChangedEmitter.subscribe(()=>{
      //   this.data = this.ds.getData();
      // }));
  }

  ngOnInit() {
    this.pagination = this.store.select('pagination');
    this.filters = this.store.select('filters');
    this.subscriptions.push(this.pagination.subscribe((data) => console.log(data)));
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
    this.store.dispatch(new PaginationActions.ResetPagination());
    this.subscriptions.map((sub) => {
      sub.unsubscribe();
    });
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
