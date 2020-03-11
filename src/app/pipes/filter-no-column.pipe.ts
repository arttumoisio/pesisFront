
import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filterNoColumn'
})
export class FilterNoColumnPipe implements PipeTransform {

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
  transform(items: object[], value: string): object[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    // console.log(items[0][field]);
    // console.log(typeof(items[0][field]));
    return items.filter(singleItem => 
      this.rowThatIncludes(singleItem,value.toLowerCase())
    );
  }
}
