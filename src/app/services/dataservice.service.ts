import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataService {
  private data: object[];
  private length: number;
  private otsikot: string[];
  private errorMessage: string;

  reversed = false;
  jarjestetty = '';

  tableScroll: number = 0;

  private pagination: {start:number; pages:number; show:number; records:number;} = {
    start:1,
    pages:1,
    show:10,
    records:1
  };

  dataChangedEmitter = new EventEmitter();
  dataLoadingEmitter = new EventEmitter<boolean>();
  paginatorEmitter = new EventEmitter();
  filterEmitter = new EventEmitter();
  piilotusEmitter = new EventEmitter();
  dataSortedEmitter = new EventEmitter();
  errorEmitter = new EventEmitter<string>();

  constructor() { }

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
    if(data){
      this.data = data;
      this.length = data.length;
    }
    this.setOtsikot();
    if(this.jarjestetty){
      this.workerSort(this.jarjestetty,this.reversed)
    } else {
      this.dataLoadingEmitter.emit(false);
      this.dataChangedEmitter.emit();
    }
  }

  setSortedData(data: object[] = undefined, sort:string = ""): void {
    if(data){
      this.data = data;
      this.length = data.length;
      if(sort !== 'sort') {
        this.reversed = false;
        this.jarjestetty = "";
      } else {
        this.paginatorEmitter.emit();
      }
    }
    this.setOtsikot();
    this.dataLoadingEmitter.emit(false);
    if (sort === '') {
      this.dataChangedEmitter.emit();
    } else {
      this.dataSortedEmitter.emit();
    }
  }

  getPagination(){
    return this.pagination;
  }
  setPagination(start: number = 1, records: number = this.length, show: number = this.pagination.show){
    this.pagination.start = Number(start);
    this.pagination.show = Number(show);
    this.pagination.pages = Math.ceil(records / show);
    this.pagination.records = Number(records);
    if (this.pagination.start*this.pagination.show > records) {
      this.pagination.start = this.pagination.pages;
    }
    this.paginatorEmitter.emit();
    this.filterEmitter.emit();
  }

  
  sortData(sarake: string) {

    if (this.jarjestetty === sarake) {
      this.reversed = !this.reversed;
      this.workerSort(sarake, true);
    } else {
      this.reversed = false;
      this.jarjestetty = sarake;
      this.workerSort(sarake);
    }
  }
  sortRawData(){
    if (this.reversed){
      this.workerSort(this.jarjestetty);
      this.workerSort(this.jarjestetty, true);
    } else {
      this.workerSort(this.jarjestetty);
    }
  }

  workerSort(sarake: string, reverse: boolean = false) {
    if (typeof Worker !== 'undefined') 
    {
      // Create a new
      const worker = new Worker('../workers/sort.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.setSortedData(data, 'sort');
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
      if (this.reversed){
        this.data.reverse();
        this.setSortedData(this.data, 'sort')
      } else {
        this.sortDataSync();
      }
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
    this.setSortedData(this.data, "sort");
  }
}
