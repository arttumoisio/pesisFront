import { Pipe, PipeTransform } from '@angular/core';
import { PaginatorService } from '../services/paginator.service';

@Pipe({
  name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {

  constructor(private ps: PaginatorService){}

  transform(data: object[], arg:any=undefined): object[] {
    const {firstRow, show} = this.ps.getPagination();
    // console.log('Pagination pipe:',data.length);
    return data.slice(firstRow,firstRow+show);
  }

}
