
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

  filterEquals(items, str, col){
    return items.filter(item => String(item[col]).toLowerCase() === str.toLowerCase());
  }

  filterLesser(items, str, col){
    return items.filter(item => Number(item[col]) <= Number(str));
  }
  
  filterGreater(items, str, col){
    return items.filter(item => Number(item[col]) >= Number(str));
  }

  filterNotEqual(items, str, col){
    return items.filter(item => String(item[col]).toLowerCase() !== str.toLowerCase());
  }

  transform(items: object[], filters = undefined): object[] {
    let strings: string[] = [];
    let operators: string[] = [];
    let columns: string[] = [];
    if (!filters) {
      console.log("here");
      strings = this.fs.getFilters().strings;
      operators = this.fs.getFilters().operators;
      columns= this.fs.getFilters().columns;
    } else {
      strings = filters.strings;
      operators = filters.operators;
      columns= filters.columns;
    }
    console.log({strings, operators, columns});
    
    
    console.log(strings.length,operators.length,columns.length);
    if (!items) {
      return [];
    }
    if (strings.length === 0 || columns.length === 0) {
      return items;
    }
    if (operators.length + 1 < strings.length || operators.length + 1 < columns.length) {
      return items;
    }

    let firstStr = strings.slice(0,1)[0];
    let firstCol = columns.slice(0,1)[0];
    

    if(firstCol) {
      items = items.filter(singleItem => 
        this.columnThatIncludes(singleItem[firstCol],firstStr)
      );
    } else {
      items = items.filter(singleItem => 
        this.rowThatIncludes(singleItem,firstStr.toLowerCase())
      );
    }
    for (let i = 0; i < operators.length; i++) {
      switch (operators[i]) {
        case '=':
          items = this.filterEquals(items, strings[i+1], columns[i+1]);
          break;
        case '<=':
          items = this.filterLesser(items, strings[i+1], columns[i+1]);
          break;
        case '>=':
          items = this.filterGreater(items, strings[i+1], columns[i+1]);
          break;
        case '!=':
          items = this.filterGreater(items, strings[i+1], columns[i+1]);
          break;
      
        default:
          break;
      }
      
    }


    this.dataservice.setPagination(1,items.length);
    this.dataservice.filterEmitter.emit();
    return items;
  }
}
