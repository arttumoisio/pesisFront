
import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { DataService } from '../services/dataservice.service';

@Pipe({
  name: 'filterNoParams'
})
export class FilterNoParamsPipe implements PipeTransform {

  constructor(private fs: FilterService,
              private dataservice: DataService
              ){
                
              }

  rowThatIncludes(rivi: object,value: string):boolean{
    for (const otsikko in rivi) {
      if (rivi.hasOwnProperty(otsikko)) {
        const element = String(rivi[otsikko]).toLowerCase();
        if (element.includes(value.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  } 
  rowThatIncludesAll(rivi: object,array: string[]):boolean{
    // console.log(rivi);
    // console.log(this.rowThatIncludes(rivi, array[0]), array)
    // return f;
    for (let i = 0; i < array.length; i++) {
      if (!this.rowThatIncludes(rivi, array[i])){
        return false;
      }
    }

    return true;
  } 

  columnThatIncludes(element: any,value: string):boolean{
    return String(element).toLowerCase().includes(value.toLowerCase());
  } 

  filterEquals(items: object[], str:string, col:string){
    return items.filter(item => String(item[col]).toLowerCase() === str.toLowerCase());
  }

  filterLesser(items: object[], str:string, col:string){
    return items.filter(item => Number(item[col]) <= Number(str));
  }
  
  filterGreater(items: object[], str:string, col:string){
    return items.filter(item => Number(item[col]) >= Number(str));
  }

  filterNotEqual(items: object[], str:string, col:string){
    return items.filter(item => String(item[col]).toLowerCase() !== str.toLowerCase());
  }

  transform(items: object[], filters:  {strings:string[];operators:string[];columns:string[];}  = undefined): object[] {
    let strings: string[] = [];
    let operators: string[] = [];
    let columns: string[] = [];
    if (!filters) {
      strings = this.fs.getFiltersObj().strings;
      operators = this.fs.getFiltersObj().operators;
      columns= this.fs.getFiltersObj().columns;
    } else {
      strings = filters.strings;
      operators = filters.operators;
      columns= filters.columns;
    }

    if (!items) {
      return [];
    }
    if (strings.length === 0 || columns.length === 0) {
      return items;
    }
    if (operators.length + 1 < strings.length || operators.length + 1 < columns.length) {
      return items;
    }
    
    for (let i = 0; i < operators.length; i++) {
      switch (operators[i]) {
        case '=':
          items = this.filterEquals(items, strings[i], columns[i]);
          break;
        case '<=':
          items = this.filterLesser(items, strings[i], columns[i]);
          break;
        case '>=':
          items = this.filterGreater(items, strings[i], columns[i]);
          break;
        case '!=':
          items = this.filterNotEqual(items, strings[i], columns[i]);
          break;
      
        default:
          if(columns[i]) {
            items = items.filter(singleItem => 
              this.columnThatIncludes(singleItem[columns[i]],strings[i])
            );
          } else {
            items = items.filter((singleItem) => {
              let bool = this.rowThatIncludesAll(singleItem,strings[i].split(' '));
              // console.log(bool);
              return bool;
            });
          }
          break;
      }
      
    }


    this.dataservice.setPagination(1,items.length);
    this.dataservice.filterEmitter.emit();
    return items;
  }
}
