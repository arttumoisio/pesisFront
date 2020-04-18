import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPaginationState } from '../../../store/state/pagination.state';
import * as PaginationActions from '../../../store/actions/pagination.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class PaginatorComponent implements OnInit, OnDestroy {

  showArray: number[] = [5, 10, 20, 25, 40, 50, 100];
  // get currentPage(): number {return this.ps.getPagination().currentPage; }
  // get pages(): number {return this.ps.getPagination().pages; }
  // get show(): number {return this.ps.getPagination().show; }
  // get records(): number {return this.ps.getPagination().records; }
  pagination: Observable<IPaginationState>;

  constructor(
    // private ps: PaginatorService,
    private store: Store<{ pagination: IPaginationState}>,
    ) {
  }

  ngOnInit() {
    // this.store.select('pagination').subscribe((data) => console.log(data));
    this.pagination = this.store.select('pagination');
  }

  ngOnDestroy(): void {
    // this.ps.changePage(1);
    this.onFirstPage();
  }

  onNextPage() {
    // this.ps.toNextPage();
    this.store.dispatch(new PaginationActions.ToNextPage());
  }
  onPreviousPage() {
    // this.ps.toPreviousPage();
    this.store.dispatch(new PaginationActions.ToPreviousPage());
  }
  onFirstPage() {
    // this.ps.toFirstPage();
    this.store.dispatch(new PaginationActions.ToFirstPage());
  }
  onLastPage() {
    // this.ps.toLastPage();
    this.store.dispatch(new PaginationActions.ToLastPage());
  }
  changePage(newPage: number) {
    // this.ps.changePage(newPage);
    this.store.dispatch(new PaginationActions.ChangeCurrentPage(Number(newPage)));
  }
  changeShowCount(newShowCount: number) {
    // this.ps.changeShowCount(newShowCount);
    this.store.dispatch(new PaginationActions.ChangeShow(Number(newShowCount)));

  }

}
