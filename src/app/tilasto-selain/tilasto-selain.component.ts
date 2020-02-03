import { Component, OnInit, ViewChild } from '@angular/core';
import { DotnetRESTservice } from '../services/dotnetREST.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface LyojaDataInterface {
  pelaaja: string;
  ottelut: number;
  kunnarit: number;
  lyodyt: number;
  yht: number;
  perPeli: number;
  yritykset: number;
  pros: number;
}
export interface LyojaRunkoInterface {
  pelaaja: string;
  lyodyt: number;
  kunnarit: number;
  yritykset: number;
  ottelut: number;
}

export class LyojaDataModel implements LyojaDataInterface {
  pelaaja: string;
  ottelut: number;
  kunnarit: number;
  lyodyt: number;
  yht: number;
  perPeli: number;
  yritykset: number;
  pros: number;

  constructor (data: LyojaRunkoInterface
  //   {
  //   pelaaja: string,
  //   lyodyt: number,
  //   kunnarit: number,
  //   ottelut: number,
  //   yritykset: number
  // }
  ){
    this.pelaaja = data.pelaaja;
    this.ottelut = data.ottelut;
    this.kunnarit = data.kunnarit;
    this.lyodyt = data.lyodyt;
    this.yritykset = data.yritykset;

    this.yht = data.kunnarit + data.lyodyt;
    this.perPeli = this.yht / data.ottelut;
    this.pros = this.yht / data.yritykset;
  }
}

@Component({
  selector: 'app-tilasto-selain',
  templateUrl: './tilasto-selain.component.html',
  styleUrls: ['./tilasto-selain.component.css']
})
export class TilastoSelainComponent implements OnInit {

  montako: number = 10;

  displayedColumns: string[] = [
    // 'Sija', 
     'pelaaja', 
    // 'Ottelut', 
    // 'K',
    // 'L',
    // 'Yht',
    // 'Per peli',
    // 'Yritykset',
    // '%',
  ];

  testArray: LyojaDataModel[] = [
    new LyojaDataModel({
      pelaaja: "Kalle Moisio",
      ottelut: 160,
      lyodyt: 333,
      kunnarit: 15,
      yritykset: 400,
    })
  ];

  datasource = new MatTableDataSource(this.testArray);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private restService: DotnetRESTservice) {
    this.onHae(10)
  }

  ngOnInit() {
    this.datasource.sort = this.sort;
    
  }

  onHae(value: number ){
    this.montako = value;
    console.log(this.montako);
    this.restService.getlyojat(this.montako).subscribe((data: LyojaRunkoInterface[])=>{
      this.testArray = [];
      data.forEach(rivi => {
        this.testArray.push(new LyojaDataModel(rivi))
      });
      console.log(this.datasource.data);
      this.datasource.data = this.testArray;
      console.log(this.datasource.data);
    })
  }

}
