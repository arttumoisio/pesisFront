import { Component, OnInit } from '@angular/core';
import { DotnetRESTservice } from '../services/dotnetREST.service';

export interface LyojaDataModel {
  pelaaja: string;
  ottelut: number;
  lyodyt: number;
  kunnarit: number;
  yritykset: number;
}

@Component({
  selector: 'app-tilasto-selain',
  templateUrl: './tilasto-selain.component.html',
  styleUrls: ['./tilasto-selain.component.css']
})
export class TilastoSelainComponent implements OnInit {

  montako: number = 10;

  testArray: LyojaDataModel[] = [
    // {
    //   pelaaja: "Kalle Moisio",
    //   ottelut: 160,
    //   lyodyt: 333,
    //   kunnarit: 15,
    //   yritykset: 400,
    // }
  ];

  constructor(private restService: DotnetRESTservice) {
    this.onHae(10)
  }

  ngOnInit() {
    
  }

  onHae(value: number ){
    this.montako = value;
    console.log(this.montako);
    this.restService.getlyojat(this.montako).subscribe((data: LyojaDataModel[])=>{
      this.testArray = data;
      console.log(data);
    })
  }

}
