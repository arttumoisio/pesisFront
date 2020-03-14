import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private sarake: string = '';
  private reversed: boolean = false;

  public sortEmitter = new EventEmitter();
  public sortedEmitter = new EventEmitter<object[]>();

  constructor() { }

  getSortParams() : {sarake:string; reversed:boolean;}{
    return {sarake:this.sarake,reversed:this.reversed};
  }
  setSortParams(sarake:string) : void{
    if (sarake === this.sarake){
      this.reversed = !this.reversed
    } else {
      this.sarake = sarake;
      this.reversed = false;
    }
    this.sortEmitter.emit();
  }
  resetSortParams() : void{
    this.reversed = false;
    this.sarake = '';
  }

  returnData: object[] = [];

  workerSort(data2: object[]) {
    if (typeof Worker !== 'undefined') 
    {
      // Create a new
      const worker = new Worker('../workers/sort.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.sortedEmitter.emit(data); 
      }
      worker.postMessage({
          data:data2,
          sarake:this.sarake, 
          reverse:this.reversed
      });
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      console.log("Worker not supported");
      this.sortDataSync(data2);
    }

  }

  sortDataSync(data: object[]) {
    data.sort((a, b) => {
      if ( a[this.sarake] < b[this.sarake]) {return this.reversed ? -1 : 1;}
      if ( a[this.sarake] > b[this.sarake]) {return this.reversed ? 1 : -1;}
      return 0;
    });
  }

}
