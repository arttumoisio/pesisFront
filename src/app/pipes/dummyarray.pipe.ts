import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dummyarray'
})
export class DummyarrayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
