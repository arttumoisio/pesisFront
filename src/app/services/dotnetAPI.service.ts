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
  serverUrl = '';
  pelaajatUrl = '';
  joukkueetUrl = '';

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
    this.pelaajatUrl = this.serverUrl + '/pelaajat';
    this.joukkueetUrl = this.serverUrl + '/joukkueet';
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
        // console.log(param);
        // console.log(value);
      }
    }
    // console.log(params);
    // console.log(params.keys());
    // console.log(params.toString());
    return this.http.get(this.joukkueetUrl, {params});
  }

  haeJoukkueetApu(vuosiAlkaen = 2000, vuosiLoppuen = 2020) {
    const getUrl = this.serverUrl + '/apu/joukkueet';

    return this.http.get(getUrl);
  }
  haeVuodetApu() {
    const getUrl = this.serverUrl + '/apu/vuodet';
    return this.http.get(getUrl);
  }
}
