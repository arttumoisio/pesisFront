import { Injectable, EventEmitter } from '@angular/core';
import { SortService } from './sort.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: object[];
  private length: number;
  otsikot: string[];
  private errorMessage: string;



  dataChangedEmitter = new EventEmitter();
  dataLoadingEmitter = new EventEmitter<boolean>();
  errorEmitter = new EventEmitter<string>();

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

  setOtsikot():void {
    if (this.data === undefined || this.data.length === 0 ) {
      this.otsikot = [];
      this.errorMessage = 'Haku ei tuottanut yhtään tulosta.';
      this.errorEmitter.emit(this.errorMessage);
    } else {
      this.otsikot = Object.keys(this.data[0]);
      this.errorMessage = '';
      this.errorEmitter.emit('');
    }
  }

  getOtsikot(): string[] {
    return this.otsikot;
  }

  startLoading() {
    this.data = [];
    this.length = 0;
    this.dataChangedEmitter.emit();
    this.dataLoadingEmitter.emit(true);
  }

  setRawData(data: object[] = undefined) : void {
    console.log(data);
    console.log(Object.keys(data[0]).length);
    if(data){
      this.data = data;
      this.length = data.length;
    }
    this.setOtsikot();
    if(this.ss.getSortParams().sarake){
      // this.ss.sortDataSync(this.data);
      this.ss.workerSort(this.data);

      this.dataLoadingEmitter.emit(false)
    } else{
      this.dataChangedEmitter.emit();
      this.dataLoadingEmitter.emit(false);
    }
    
    
  }

  setSortedData(data: object[]) : void{
    this.data = data;
    this.dataChangedEmitter.emit();
  }
}
