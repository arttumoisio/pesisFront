import { Pipe, PipeTransform } from '@angular/core';
import { PaginatorService } from '../services/paginator.service';

@Pipe({
  name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {

  constructor(private ps: PaginatorService){}

  transform(data: object[]): object[] {
    console.log('Pagination pipe:',data.length);
    const {firstRow, show} = this.ps.getPagination();
    return data.slice(firstRow,firstRow+show);
  }

}
