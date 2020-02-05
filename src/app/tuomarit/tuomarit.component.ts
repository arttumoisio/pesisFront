import { Component, OnInit, ViewChild } from '@angular/core';
import { DotnetRESTservice } from '../services/dotnetREST.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  selector: 'app-tuomarit',
  templateUrl: './tuomarit.component.html',
  styleUrls: ['./tuomarit.component.css']
})
export class TuomaritComponent implements OnInit {

  montako: number = 10;

  testArray: LyojaDataModel[] = [
    new LyojaDataModel({
      pelaaja: "Kalle Moisio",
      ottelut: 160,
      lyodyt: 333,
      kunnarit: 15,
      yritykset: 400,
    })
  ];

  otsikot: string[] = [];

  constructor(private restService: DotnetRESTservice) {
    this.onHae(10)
  }

  ngOnInit() {
    this.selvitaOtsikot()
    
  }

  serverError: string = null;
  onHae(value: any ){
    this.testArray = [];
    if (value === ""){return this.serverError = "Syötä jotakin!"}
    value = +value;
    if (value === 0){return this.serverError = "Et voi hakea nollaa pelaajaa!";}
    this.montako = value;
    console.log(this.montako);
    this.restService.getlyojatlyhyt(this.montako).subscribe(
      (data: LyojaRunkoInterface[])=>{
        
        data.forEach(rivi => {
          this.testArray.push(new LyojaDataModel(rivi))
        });
        console.log(this.testArray);
        this.selvitaOtsikot();
        this.serverError = null;
    }, (error: HttpErrorResponse)=>{
      this.serverError = error.statusText;
      
      console.log(error.message);
      console.log(error);
    })
  }

  selvitaOtsikot(){
    this.otsikot = [];
    if(!this.testArray[0]) return;
    Object.keys(this.testArray[0]).forEach(element=>{
      if(this.testArray[0][element]){
        this.otsikot.push(element);
      }
    })
  }
  reversed: boolean = false;
  jarjestetty: string = "";
  sortTulokset(sarake: string){
    if (this.jarjestetty === sarake || sarake === "sija"){
      this.testArray.reverse();
      this.reversed = !this.reversed;
      console.log("reverse");
    } else {
      this.reversed = false;
      this.jarjestetty = sarake;
      this.sortArrayOfObjects(sarake,this.testArray);
      console.log("sort");
    }
  }

  sortArrayOfObjects(col: string, data: LyojaDataModel[]){
    data.sort((a,b)=>{
      if ( a[col] < b[col]){
        return 1;
      }
      if ( a[col] > b[col]){
        return -1;
      }
      return 0;
    });
  }

}
