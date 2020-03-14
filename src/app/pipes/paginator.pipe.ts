import { Pipe, PipeTransform } from '@angular/core';
import { PaginatorService } from '../services/paginator.service';

@Pipe({
  name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {

  constructor(private ps: PaginatorService){}

  transform(data: object[], arg:any=undefined): object[] {
    console.log('Pagination pipe:',data.length);
    const {firstRow, show} = this.ps.getPagination();
    console.log("firstrow: ",firstRow,"lastrow", firstRow+show, "pagination", this.ps.getPagination());
    
    return data.slice(firstRow,firstRow+show);
  }

}
