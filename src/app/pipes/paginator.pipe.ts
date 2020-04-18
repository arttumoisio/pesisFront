import { Pipe, PipeTransform } from '@angular/core';
import { IPagination } from '../models/pagination.interface';
import { IPaginationState } from '../store/state/pagination.state';

@Pipe({
  name: 'paginator',
})
export class PaginatorPipe implements PipeTransform {

  transform(data: object[], pagination: IPaginationState): object[] {

    // console.log(pagination);

    const start = (pagination.currentPage - 1) * pagination.show;
    const end =   pagination.currentPage * pagination.show;

    return data.slice(start, end);
  }

}
