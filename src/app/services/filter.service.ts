import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filters: {string:string;operator:string;column:string;}[] = [{
    string:'',
    operator:'',
    column:'',
  }]

  constructor() { }

  setFilters(filtersObj:{strings:string[];operators:string[];columns:string[];} ):void {
    this.filters = [];
    filtersObj.strings.forEach((val,i)=>{
      this.filters.push({
        string:val,
        operator:filtersObj.operators[i],
        column:filtersObj.columns[i],
      });
    });
  }

  setIntFilters(filters:{string:string;operator:string;column:string;}[]):void{

    this.filters = this.filters.splice(0,1).concat(filters);
    console.log('Filter should be', this.filters.slice(0,1));
    console.log('These should be', filters);
    console.log('Set',this.filters); 
  }
  addIntFilter(filter:{string:string;operator:string;column:string;}):void{
    this.filters.push(filter);
  }
  removeIntFilter(filter:{string:string;operator:string;column:string;}):void{
    let index: number = this.filters.findIndex((value)=>{
      value == filter;
    });
    if (index == 0 || index == -1) {return;}
    this.filters.splice(index,1);
  }
  
  setStrFilter(filter:{string:string;operator:string;column:string;}):void{
    this.filters[0] = filter;
    console.log('Set this',filter); 
    console.log('Set',this.filters); 
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
    console.log(filtersObj);
    
    return filtersObj;
  }

  getFilters() :  {string:string;operator:string;column:string;}[] {
    console.log("get", this.filters);
    return this.filters;
  }
  getStrFilters() :  {string:string;operator:string;column:string;}[] {
    console.log("getStr", this.filters.slice(0,1));
    return this.filters.slice(0,1);
  }
  getIntFilters() :  {string:string;operator:string;column:string;}[] {
    console.log("getInt", this.filters.slice(1));
    return this.filters.slice(1);
  }
}
