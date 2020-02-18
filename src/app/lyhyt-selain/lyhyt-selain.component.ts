import { Component, OnInit, ViewChild } from '@angular/core';
import { DotnetRESTservice } from '../services/dotnetREST.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lyhyt-selain',
  templateUrl: './lyhyt-selain.component.html',
  styleUrls: ['./lyhyt-selain.component.css']
})
export class LyhytSelainComponent implements OnInit {
  montako = 10;

  testArray: object[] = [];
  serverError: string = null;
  reversed = false;
  jarjestetty = '';

  otsikot: string[] = [];

  constructor(private restService: DotnetRESTservice) {
    this.onHae(10);
  }

  ngOnInit() {
    this.selvitaOtsikot();
  }

  onHae(value: any ) {
    this.testArray = [];
    if (value === '') {return this.serverError = 'Syötä jotakin!'; }
    value = +value;
    if (value === 0) {return this.serverError = 'Et voi hakea nollaa pelaajaa!'; }
    this.montako = value;

    this.restService.getlyojatlyhyt(this.montako).subscribe(
      (data: object[]) => {
        this.testArray = data;
        this.selvitaOtsikot();
        this.serverError = null;
    }, (error: HttpErrorResponse) => {
      this.serverError = error.statusText;
    });
  }

  selvitaOtsikot() {
    this.otsikot = [];
    if (!this.testArray[0]) {return; }
    this.otsikot = Object.keys(this.testArray[0]);
  }

  sortTulokset(sarake: string) {
    if (this.jarjestetty === sarake || sarake === 'sija') {
      this.testArray.reverse();
      this.reversed = !this.reversed;
      console.log('reverse');
    } else {
      this.reversed = false;
      this.jarjestetty = sarake;
      this.sortArrayOfObjects(sarake, this.testArray);
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

