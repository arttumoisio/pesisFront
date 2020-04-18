
import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PaginationActions from '../store/actions/pagination.actions';
import { IFilterState } from '../store/state/filters.state';

enum operators {
  EQUALS = '=',
  LESSER = '<=',
  GREATER = '>=',
  NOTEQUALS = '!=',
}
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  constructor(
    private store: Store<{ filters: IFilterState}>,
            ) {
  }

  rowThatIncludes(rivi: object, value: string): boolean {
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
  rowThatIncludesAll(rivi: object, array: string[]): boolean {
    for (const elem of array) {
      if (!this.rowThatIncludes(rivi, elem)) {
        return false;
      }
    }
    return true;
  }

  columnThatIncludes(element: any, value: string): boolean {
    return String(element).toLowerCase().includes(value.toLowerCase());
  }

  filterEquals(data: object[], str: string, col: string) {
    return data.filter((item) => String(item[col]).toLowerCase() === str.toLowerCase());
  }

  filterLesser(data: object[], str: string, col: string) {
    return data.filter((item) => Number(item[col]) <= Number(str));
  }

  filterGreater(data: object[], str: string, col: string) {
    return data.filter((item) => Number(item[col]) >= Number(str));
  }

  filterNotEqual(data: object[], str: string, col: string) {
    return data.filter((item) => String(item[col]).toLowerCase() !== str.toLowerCase());
  }

  transform(data: object[], filters?: IFilterState): object[] {

    // console.log(filters);

    if (!data) {return []; }

    if (filters.suodin?.string !== '') {
      const suodinColumn = filters.suodin.column;
      const suodinString = filters.suodin.string;
      if (filters.suodin.column !== '') {
        data = data.filter((singleItem) =>
          this.columnThatIncludes(singleItem[suodinColumn], suodinString),
        );
      } else {
        data = data.filter((singleItem) => {
          return this.rowThatIncludesAll(singleItem, suodinString.split(' '));
        });
      }
    }

    const count = 0;
    filters.filters.forEach((filter) => {

      switch (filter.operator) {
        case operators.EQUALS: {
          data = this.filterEquals(data, filter.string, filter.column);
          break;
        }
        case operators.LESSER: {
          data = this.filterLesser(data, filter.string, filter.column);
          break;
        }
        case operators.GREATER: {
          data = this.filterGreater(data, filter.string, filter.column);
          break;
        }
        case operators.NOTEQUALS: {
          data = this.filterNotEqual(data, filter.string, filter.column);
          break;
        }
        default : {
          break;
        }
      }
    });

    this.store.dispatch(new PaginationActions.SetRecords(data.length));
    return data;
  }
}
