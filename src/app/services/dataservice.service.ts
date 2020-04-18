import { EventEmitter, Injectable } from '@angular/core';
import { SortService } from './sort.service';
import { Store } from '@ngrx/store';
import { IPaginationState } from '../store/state/pagination.state';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  dataChangedEmitter = new EventEmitter();

  private data: object[];
  private length: number;
  private otsikot: string[];
  private errorMsg: string;
  private loading: boolean = true;

  constructor(
    private ss: SortService,
    private store: Store<{ pagination: IPaginationState}>,
    ) {
    ss.sortedEmitter.subscribe((data) => {
      this.setSortedData(data);
    });
    ss.sortEmitter.subscribe(() => {
      this.ss.workerSort(this.data);
    });
   }

  getData(): object[] {
    return this.data;
  }

  getLength(): number {
    return this.length;
  }
  getLoading(): boolean {
    return this.loading;
  }

  getErrorMsg(): string {
    return this.errorMsg;
  }
  setErrorMsg(e: string): void {
    this.errorMsg = e;
  }

  setOtsikot(): void {
    if (this.data === undefined || this.data.length === 0) {
      this.otsikot = [];
      this.errorMsg = 'Haku ei tuottanut yhtään tulosta.';
    } else {
      this.otsikot = Object.keys(this.data[0]);
      this.errorMsg = '';
    }
  }

  getOtsikot(): string[] {
    return this.otsikot;
  }

  startLoading() {
    this.data = undefined;
    this.length = 0;
    this.dataChangedEmitter.emit();
    this.loading = true;
  }

  resetData(): void {
    this.data = undefined;
    this.otsikot = undefined;
    this.errorMsg = '';
    this.length = 0;
    this.loading = true;
  }

  setRawData(data?: object[]): void {

    if (!data || data === [] || data.length <= 0) {
      this.data = undefined;
      this.dataChangedEmitter.emit();
      this.loading = false;
    } else {
      // console.log(data);
      // console.log(Object.keys(data[0]).length);
      this.data = data;
      this.length = data.length;
    }
    this.setOtsikot();
    if (this.ss.getSortParams().sarake) {
      // this.ss.sortDataSync(this.data);
      this.ss.workerSort(this.data);

      this.loading = false;
    } else {
      this.dataChangedEmitter.emit();
      this.loading = false;
    }

  }

  setSortedData(data: object[]): void {
    this.data = data;
    this.dataChangedEmitter.emit();
  }
}
