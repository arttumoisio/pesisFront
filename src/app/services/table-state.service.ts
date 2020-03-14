import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableStateService {
  tableScroll: number = 0;
}
