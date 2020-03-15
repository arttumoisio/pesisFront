import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DotnetRESTservice {

  // serverUrl = 'http://192.168.99.100:5000';
  // serverUrl = 'https://shrouded-savannah-06829.herokuapp.com';
  // serverUrl = 'https://localhost:5001';
  serverUrl: string;
  pelaajatUrl: string;
  joukkueetUrl: string;
  tuomaritUrl: string;
  
  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
    this.pelaajatUrl = this.serverUrl + '/pelaajat';
    this.joukkueetUrl = this.serverUrl + '/joukkueet';
    this.tuomaritUrl = this.serverUrl + '/tuomarit';
  }

  onHaePelaajat(formData: object) {
    let params = new HttpParams();
    for (const elem in formData) {
      if (elem) {
        const param: string = elem;
        const value: string = formData[elem].toString();
        params = params = params.append(param, value);
      }
    }
    return this.http.get(this.pelaajatUrl, {params});
  }


  onHaeJoukkueet(formData: object) {
    let params = new HttpParams();
    for (const elem in formData) {
      if (elem) {
        const param: string = elem;
        const value: string = formData[elem].toString();
        params = params = params.append(param, value);
      }
    }
    return this.http.get(this.joukkueetUrl, {params});
  }

  onHaeTuomarit(formData: object) {
    // console.log("tuomariform before fetch", formData);
    let params = new HttpParams();
    for (const elem in formData) {
      if (elem) {
        const param: string = elem;
        const value: string = formData[elem].toString();
        // console.log("tuomarit param,value", param, value);
        params = params = params.append(param, value);
      }
    }
    // console.log("TUomariparams: ", params);
    
    return this.http.get(this.tuomaritUrl, {params});
  }
  
  haeJoukkueetApu(vuosiAlkaen:string = "2000", vuosiLoppuen:string = "2019") {
    // console.log("jouk", vuosiAlkaen, vuosiLoppuen);

    
    let params = new HttpParams();
    params = params.append("kaudetAlku",vuosiAlkaen.toString());
    params = params.append("kaudetLoppu",vuosiLoppuen.toString());
    const getUrl = this.serverUrl + '/apu/joukkueet';
    
    // console.log("joukkueet params:", params);
    return this.http.get(getUrl, {params});
  }
  haeLukkaritApu(vuosiAlkaen:string = "2000", vuosiLoppuen:string = "2019") {
    // console.log("lukk", vuosiAlkaen, vuosiLoppuen);
    let params = new HttpParams();
    params = params.append("kaudetAlku",vuosiAlkaen.toString());
    params = params.append("kaudetLoppu",vuosiLoppuen.toString());
    const getUrl = this.serverUrl + '/apu/lukkarit';
    // console.log("kohta lukkareiteteasd");
    // console.log("lukkari params:", params);
    return this.http.get(getUrl, {params});
  }
  haeVuodetApu() {
    const getUrl = this.serverUrl + '/apu/vuodet';
    return this.http.get(getUrl);
  }
  haeSarjaVaiheApu(vuosiAlkaen:string = "2000", vuosiLoppuen:string = "2019") {
    let params = new HttpParams();
    params = params.append("kaudetAlku",vuosiAlkaen.toString());
    params = params.append("kaudetLoppu",vuosiLoppuen.toString());
    const getUrl = this.serverUrl + '/apu/sarjavaihe';
    return this.http.get(getUrl, {params});
  }
}
