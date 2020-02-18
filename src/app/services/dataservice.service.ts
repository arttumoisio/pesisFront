import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: object[];

  dataChangedEmitter = new EventEmitter();

  constructor() { }

  getData(): object[] {
    return this.data;
  }

  setData(data: object[]): void {
    this.data = data;
    this.dataChangedEmitter.emit();
  }
}
