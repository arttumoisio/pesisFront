import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: object[];

  dataChangedEmitter = new EventEmitter();

  dataLoadingEmitter = new EventEmitter<boolean>();

  constructor() { }

  getData(): object[] {
    return this.data;
  }

  startLoading() {
    this.data = [];
    this.dataChangedEmitter.emit();
    this.dataLoadingEmitter.emit(true);
  }

  setData(data: object[]): void {
    this.data = data;
    this.dataChangedEmitter.emit();
    this.dataLoadingEmitter.emit(false);
  }
}
