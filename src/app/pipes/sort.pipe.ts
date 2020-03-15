import { Pipe, PipeTransform } from '@angular/core';
import { SortService } from '../services/sort.service';
import { DataService } from '../services/dataservice.service';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  returnData: object[] = [];
  constructor(private ss: SortService){}

  workerSort(data2: object[]) {
    const {sarake, reversed} = this.ss.getSortParams();
    if (typeof Worker !== 'undefined') 
    {
      // Create a new
      const worker = new Worker('../workers/sort.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.returnData = data; 
      }
      worker.postMessage({
          data:data2, 
          sarake:sarake, 
          reverse:reversed
      });
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      console.log("Worker not supported");
      this.returnData = this.sortDataSync(data2,sarake,reversed);
    }
  }

  sortDataSync(data: object[], col: string,reversed:boolean) {
    data.sort((a, b) => {
      if ( a[col] < b[col]) {return reversed ? -1 : 1;}
      if ( a[col] > b[col]) {return reversed ? 1 : -1;}
      return 0;
    });
    return data;
  }

  transform(data: object[], col='', rev='' ): object[] {
    if(!data){return [];}
    this.workerSort(data);
    // console.log(data.length)
    // console.log(this.returnData.length);
    return this.returnData;
  }
}
