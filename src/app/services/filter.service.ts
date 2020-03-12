import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filters: {strings:string[];operators:string[];columns:string[];} = {
    strings:[],
    operators:[],
    columns:[''],
  }

  constructor() { }

  setFilters(filters:{strings:string[];operators:string[];columns:string[];}):void{
    this.filters = filters;
    console.log('These should be', filters);
    console.log('Set',this.filters);
    
  }

  getFilters() : {strings:string[];operators:string[];columns:string[];} {
    return {
      strings:this.filters.strings,
      operators:this.filters.operators,
      columns:this.filters.columns,
    };
  }
}
