import { Injectable } from '@angular/core';
import { DataService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filters: {string:string;operator:string;column:string;}[] = [{
    string:'',
    operator:'',
    column:'',
  }]

  constructor(private ds: DataService) {
    
  }

  emit(){
    this.ds.filterEmitter.emit();
  }

  setFilters(filtersObj:{strings:string[];operators:string[];columns:string[];} ):void {
    this.filters = [];
    filtersObj.strings.forEach((val,i)=>{
      this.filters.push({
        string:val,
        operator:filtersObj.operators[i],
        column:filtersObj.columns[i],
      });
    });
    this.emit();
  }

  setIntFiltersObj(intFiltersObj:{strings:string[];operators:string[];columns:string[];} ):void {
    this.filters.splice(1);
    
    intFiltersObj.strings.forEach((val,i)=>{
      this.filters.push({
        string:val,
        operator:intFiltersObj.operators[i],
        column:intFiltersObj.columns[i],
      });
    });
    this.emit();
  }

  
  setIntFilters(filters:{string:string;operator:string;column:string;}[]):void{
    this.filters.splice(1);
    this.filters.concat(filters);
    this.emit();
  }
  addIntFilter(filter:{string:string;operator:string;column:string;}):void{
    this.filters.push(filter);
    this.emit();
  }
  removeIntFilter(filter:{string:string;operator:string;column:string;}):void{
    let index: number = this.filters.findIndex((value)=>{
      return value == filter;
    });
    if (index == 0 || index == -1) {
      return;
    }
    this.filters.splice(index,1);
    this.emit();
    
  }
  
  setStrFilter(filter:{string:string;operator:string;column:string;}):void{
    this.filters[0] = filter;
    this.emit();
  }

  getFiltersObj() : {strings:string[];operators:string[];columns:string[];} {//{string:string;operator:string;column:string;}[] {
    const filtersObj: {strings:string[];operators:string[];columns:string[];} = {
      strings:[],
      operators:[],
      columns:[],
    };
    this.filters.forEach((filter)=>{
      filtersObj.strings.push(filter.string);
      filtersObj.operators.push(filter.operator);
      filtersObj.columns.push(filter.column);
    });
    
    return filtersObj;
  }

  getFilters() :  {string:string;operator:string;column:string;}[] {
    return this.filters;
  }
  getStrFilters() :  {string:string;operator:string;column:string;}[] {
    return this.filters.slice(0,1);
  }
  getIntFilters() :  {string:string;operator:string;column:string;}[] {
    return this.filters.slice(1);
  }
}
