import { Injectable, EventEmitter } from '@angular/core';
import { SortService } from './sort.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: object[];
  private length: number;
  otsikot: string[];
  private errorMsg: string;
  private loading: boolean = true;



  dataChangedEmitter = new EventEmitter();

  constructor(private ss: SortService) {
    ss.sortedEmitter.subscribe((data)=>{
      this.setSortedData(data);
    });
    ss.sortEmitter.subscribe(()=>{
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
  setErrorMsg(e:string): void {
    this.errorMsg = e;
  }

  setOtsikot():void {
    if (this.data === undefined || this.data.length === 0 ) {
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
    this.data = [];
    this.length = 0;
    this.dataChangedEmitter.emit();
    this.loading = true;
  }

  resetData():void{
    this.data = [];
    this.otsikot = [];
    this.errorMsg = '';
    this.length = 0;
    this.loading = false;
  }

  setRawData(data: object[] = undefined) : void {
    
    if(!data || data === [] || data.length<=0){
      this.data = [];
      this.dataChangedEmitter.emit();
      this.loading = false;
    } else {
      console.log(data);
      // console.log(Object.keys(data[0]).length);
      this.data = data;
      this.length = data.length;
    }
    this.setOtsikot();
    if(this.ss.getSortParams().sarake){
      // this.ss.sortDataSync(this.data);
      this.ss.workerSort(this.data);

      this.loading = false;
    } else{
      this.dataChangedEmitter.emit();
      this.loading = false;
    }
    
    
  }

  setSortedData(data: object[]) : void{
    this.data = data;
    this.dataChangedEmitter.emit();
  }
}
