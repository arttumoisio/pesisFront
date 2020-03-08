import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: object[];
  private length: number;
  reversed = false;
  jarjestetty = '';

  private pagination = {
    start:1,
    pages:1,
    show:10
  };

  dataChangedEmitter = new EventEmitter();
  dataLoadingEmitter = new EventEmitter<boolean>();
  paginatorEmitter = new EventEmitter();

  constructor() { }

  getData(): object[] {
    return this.data;
  }

  getLength(): number {
    return this.length;
  }

  startLoading() {
    this.data = [];
    this.length = 0;
    this.dataChangedEmitter.emit();
    this.dataLoadingEmitter.emit(true);
  }

  setData(data: object[] = undefined): void {
    if(data){
      this.data = data;
      this.length = data.length;
    }
    this.dataLoadingEmitter.emit(false);
    this.dataChangedEmitter.emit();
  }

  getPagination(){
    return this.pagination;
  }
  setPagination(start:number, pages:number, show:number){
    this.pagination.start = start;
    this.pagination.show = show;
    this.pagination.pages = pages;
    this.paginatorEmitter.emit();
  }

  
  sortData(sarake: string) {
    //this.dataLoadingEmitter.emit(true);
    if (this.jarjestetty === sarake) {
      this.reversed = !this.reversed;
      this.workerSort(sarake, true);
    } else {
      this.reversed = false;
      this.jarjestetty = sarake;
      this.workerSort(sarake);
    }
  }

  workerSort(sarake: string, reverse: boolean = false) {
    if (typeof Worker !== 'undefined') 
    {
      // Create a new
      const worker = new Worker('../workers/sort.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.setData(data);
        console.log(`sorted ${reverse} ${sarake}`);
      };
      worker.postMessage({
          data:this.data, 
          sarake:sarake, 
          reverse:reverse
        });
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      console.log("Worker not supported");
      this.sortDataSync();
    }
  }

  sortDataSync(col: string = this.jarjestetty) {
    this.data.sort((a, b) => {
      if ( a[col] < b[col]) {
        return 1;
      }
      if ( a[col] > b[col]) {
        return -1;
      }
      return 0;
    });
    this.setData();
  }
}
