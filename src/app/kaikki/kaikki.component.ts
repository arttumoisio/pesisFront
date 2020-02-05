import { Component, OnInit } from '@angular/core';
import { DotnetRESTservice } from '../services/dotnetREST.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-kaikki',
  templateUrl: './kaikki.component.html',
  styleUrls: ['./kaikki.component.css']
})
export class KaikkiComponent implements OnInit {

    montako: number = 10;

    ensimmainen: number = 0;


  
    kokoArray: Object[] = [];
    viewArray: Object[] = [];
  
    otsikot: string[] = []; //Object.keys(this.kokoArray[0]);
  
    constructor(private restService: DotnetRESTservice) {
      this.haeKaikki()
    }
  
    ngOnInit() {
      this.selvitaOtsikot()
      
    }
  
    serverError: string = null;
    haeKaikki(){
      this.kokoArray = [];
  
      this.restService.getlyojatkaikki().subscribe(
        (data: Object[])=>{
          
          this.kokoArray = data;
          this.viewArray = this.kokoArray.slice(this.ensimmainen,this.montako+this.ensimmainen);
          this.selvitaOtsikot();
          this.serverError = null;
          
      }, (error: HttpErrorResponse)=>{
        this.serverError = error.statusText;
      })
    }
  
    selvitaOtsikot(){
      this.otsikot = [];
      if(!this.viewArray[0]) return;
      this.otsikot = Object.keys(this.viewArray[0]);
    }
  
    reversed: boolean = false;
    jarjestetty: string = "";
    sortTulokset(sarake: string){
      if (this.jarjestetty === sarake || sarake === "sija"){

        this.kokoArray.reverse();

        this.reversed = !this.reversed;

        console.log("reverse");
      } else {
        this.reversed = false;
        this.sortArrayOfObjects(sarake,this.kokoArray);
      }
      this.jarjestetty = sarake;

      this.viewArray = this.kokoArray.slice(this.ensimmainen,this.montako+this.ensimmainen);
      console.log(this.jarjestetty)
    }
  
    sortArrayOfObjects(col: string, data: Object[]){
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

    onSeuraava(){
      this.ensimmainen += +this.montako;
      if (this.ensimmainen>this.kokoArray.length) { 
        this.ensimmainen = this.ensimmainen - this.montako;
      }
      this.viewArray = this.kokoArray.slice(this.ensimmainen,this.montako+this.ensimmainen);

      console.log(this.ensimmainen);
      console.log(this.montako);
    }
    
    onEdellinen(){
      this.ensimmainen -= +this.montako;
      if (this.ensimmainen<0) { this.ensimmainen = 0;}

      this.viewArray = this.kokoArray.slice(this.ensimmainen,this.montako+this.ensimmainen);

      console.log(this.ensimmainen);
      console.log(this.montako);
    }
  
  }
  
  
