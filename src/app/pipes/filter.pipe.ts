import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {

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

  transform(items: object[], value: string, field: string = "" ): object[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }

    if(field) {
      return items.filter(singleItem => 
        String(singleItem[field]).toLowerCase().includes(value.toLowerCase())
      );
    } else {
      return items.filter(singleItem => 
        this.rowThatIncludes(singleItem,value.toLowerCase())
      );
    }
  }
}