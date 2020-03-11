import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DataService } from '../services/dataservice.service';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {

  constructor(private dataservice: DataService){}

  rowThatIncludes(rivi: object,value: string):boolean{
    for (const otsikko in rivi) {
      if (rivi.hasOwnProperty(otsikko)) {
        const element = String(rivi[otsikko]).toLowerCase();
        if (element.includes(value)) {
          return true;
        }
      }
    }
    return false;
  } 

  columnThatIncludes(element: any,value: string):boolean{
    return String(element).toLowerCase().includes(value.toLowerCase());
  } 

  transform(items: object[], value: string, field: string = "" ): object[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }

    if(field) {
      items = items.filter(singleItem => 
        this.columnThatIncludes(singleItem[field],value)
      );
    } else {
      items = items.filter(singleItem => 
        this.rowThatIncludes(singleItem,value.toLowerCase())
      );
    }
    this.dataservice.setPagination(1,items.length);
    this.dataservice.filterEmitter.emit();
    return items;
  }
}