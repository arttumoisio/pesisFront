import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice.service';
import { error } from 'protractor';

@Component({
  selector: 'app-data-paikka',
  templateUrl: './data-paikka.component.html',
  styleUrls: ['./data-paikka.component.css']
})
export class DataPaikkaComponent implements OnInit {

  constructor(private dataService: DataService) { }

  data: object[];
  otsikot: string[] = [];

  reversed = false;
  jarjestetty = '';
  errorMessage = '';

  ngOnInit() {
    this.data = this.dataService.getData();
    this.selvitaOtsikot();
    this.dataService.dataChangedEmitter.subscribe(() => {
      this.data = this.dataService.getData();
      this.selvitaOtsikot();
    });
  }

  selvitaOtsikot() {
    if (this.data === undefined || this.data.length === 0 ) {
      this.otsikot = [];
      this.data = undefined;
      this.errorMessage = 'Haku ei tuottanut yhtään tulosta.';
      return;
    }
    this.otsikot = Object.keys(this.data[0]);
    this.errorMessage = '';
  }


  sortTulokset(sarake: string) {
    if (this.jarjestetty === sarake || sarake === 'Sija') {
      this.data.reverse();
      this.reversed = !this.reversed;
      console.log('reverse');
    } else {
      this.reversed = false;
      this.jarjestetty = sarake;
      this.sortArrayOfObjects(sarake, this.data);
    }
  }

  sortArrayOfObjects(col: string, data: object[]) {
    data.sort((a, b) => {
      if ( a[col] < b[col]) {
        return 1;
      }
      if ( a[col] > b[col]) {
        return -1;
      }
      return 0;
    });
  }


}
