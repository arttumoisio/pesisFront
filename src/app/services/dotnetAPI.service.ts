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
        params = params.append(param, value);
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
        params = params.append(param, value);
      }
    }
    return this.http.get(this.joukkueetUrl, {params});
  }

  onHaeTuomarit(formData: object) {
    console.log("tuomariform before fetch", formData);
    let params = new HttpParams();
    for (const elem in formData) {
      if (elem) {
        const param: string = elem;
        const value: string = formData[elem].toString();
        params = params.append(param, value);
      }
    }
    return this.http.get(this.tuomaritUrl, {params});
  }

  haeJoukkueetApu(vuosiAlkaen = 2000, vuosiLoppuen = 2019) {
    const params = new HttpParams();
    params.append("kaudetAlku",String(vuosiAlkaen));
    params.append("kaudetLoppu",String(vuosiLoppuen));
    const getUrl = this.serverUrl + '/apu/joukkueet';

    return this.http.get(getUrl);
  }
  haeLukkaritApu(vuosiAlkaen = 2000, vuosiLoppuen = 2019) {
    const params = new HttpParams();
    params.append("kaudetAlku",String(vuosiAlkaen));
    params.append("kaudetLoppu",String(vuosiLoppuen));
    const getUrl = this.serverUrl + '/apu/lukkarit';
    console.log("kohta lukkareiteteasd");
    
    return this.http.get(getUrl);
  }
  haeVuodetApu() {
    const getUrl = this.serverUrl + '/apu/vuodet';
    return this.http.get(getUrl);
  }
  haeSarjaVaiheApu(vuosiAlkaen = 2000, vuosiLoppuen = 2019) {
    const getUrl = this.serverUrl + '/apu/sarjavaihe';
    return this.http.get(getUrl);
  }
}
