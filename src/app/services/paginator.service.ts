import { Injectable } from '@angular/core';
import { DataService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  records: number;
  
  constructor(private dataService: DataService) {
    dataService.dataChangedEmitter.subscribe(()=>{
      this.records = dataService.getData().length;
    });
   }
}
