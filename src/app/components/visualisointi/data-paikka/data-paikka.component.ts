import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../../services/dataservice.service';
import { SortService } from '../../../services/sort.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { IPaginationState } from '../../../store/state/pagination.state';
import { ISortState } from '../../../store/state/sort.state';
import * as PaginationActions from '../../../store/actions/pagination.actions';
import * as TableActions from '../../../store/actions/table.actions';
import * as SortActions from '../../../store/actions/sort.actions';
import { IFilterState } from '../../../store/state/filters.state';
import { ITableState } from 'src/app/store/state/table.state';

@Component({
  selector: 'app-data-paikka',
  templateUrl: './data-paikka.component.html',
  styleUrls: ['./data-paikka.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class DataPaikkaComponent implements OnInit, AfterViewInit, OnDestroy {

  get data(): object[] {return this.ds.getData(); }
  pagination: Observable< IPaginationState >;
  filters: Observable< IFilterState >;
  sort: Observable< ISortState >;

  // get jarjestetty(): string {return this.ss.getSortParams().sarake; }
  // get reversed(): boolean {return this.ss.getSortParams().reversed; }
  get otsikot(): string[] {return this.ds.getOtsikot(); }

  subscriptions: Subscription[] = [];

  constructor(
    private ds: DataService,
    private ss: SortService,
    private store: Store<{
      pagination: IPaginationState,
      filters: IFilterState,
      table: ITableState,
      sort: ISortState,
     }>,
    ) {
  }

  ngOnInit() {
    this.pagination = this.store.select('pagination');
    this.filters = this.store.select('filters');
    this.sort = this.store.select('sort');

    // this.subscriptions.push(this.pagination.subscribe((data) => console.log(data)));
    this.subscriptions.push(this.sort.subscribe((data) => console.log(data)));
  }

  ngAfterViewInit() {

    const lastColWidth: number = document.getElementById('viimeinen').scrollWidth;
    document.getElementById('viimeinenotsikko').style.minWidth = `${lastColWidth}px`;

    this.store.select('table').pipe(first()).subscribe(({tableScroll}) => {
      document.getElementById('bodyscroll').scrollLeft = tableScroll;
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new PaginationActions.ResetPagination());
    this.store.dispatch(new TableActions.GetTableScrollSuccess(this.scroll));
    this.subscriptions?.map((sub) => {
      sub.unsubscribe();
    });
  }

  scroll = 0;
  setScroll(scroll: number) {
    this.scroll = scroll;
  }

  sortData(sarake: string) {
    this.ss.setSortParams(sarake);
    this.store.dispatch( new SortActions.SetSortColumn(sarake));
  }
}
