import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ISortState } from '../store/state/sort.state';

@Injectable({
  providedIn: 'root',
})
export class SortService implements OnInit {

  sortEmitter = new EventEmitter();
  sortedEmitter = new EventEmitter<object[]>();

  private sort: Observable<ISortState>;

  private sarake: string = '';
  private reversed: boolean = false;

  private worker: Worker;
  private workerSupport: boolean;

  constructor(private store: Store<{
                sort: ISortState,
              }>,
            ) {
    if (typeof Worker !== 'undefined') {
      this.workerSupport = true;
    } else {
      // Web Workers are not supported in this environment.
      console.log('Worker not supported');
      this.workerSupport = false;
    }
  }
  ngOnInit(){
    this.sort = this.store.select('sort');
  }
  

  getSortParams(): ISortState {
    return {sarake: this.sarake, reversed: this.reversed};
  }
  setSortParams(sarake: string): void {
    if (sarake === this.sarake) {
      this.reversed = !this.reversed;
    } else {
      this.sarake = sarake;
      this.reversed = false;
    }
    this.sortEmitter.emit();
  }
  resetSortParams(): void {
    this.reversed = false;
    this.sarake = '';
  }

  workerSort(data2: object[]) {
    if (!this.workerSupport) {
      this.sortDataSync(data2);
      return;
    }
    if (this.worker) {
      this.worker.terminate();
      // console.log('terminated before sorting :', this.sarake, this.reversed);
    }
    this.worker = new Worker('../workers/sort.worker', { type: 'module' });
    this.worker.onmessage = ({ data }) => {
      this.sortedEmitter.emit(data);
      // console.log('sorted and emitted:', this.sarake, this.reversed);
    };
    this.worker.postMessage({
        data: data2,
        sarake: this.sarake,
        reverse: this.reversed,
    });

  }

  sortDataSync(data: object[]) {
    data.sort((a, b) => {
      if (a[this.sarake] < b[this.sarake]) {return this.reversed ? -1 : 1; }
      if (a[this.sarake] > b[this.sarake]) {return this.reversed ? 1 : -1; }
      return 0;
    });
  }

}
