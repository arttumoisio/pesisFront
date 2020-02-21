import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DotnetRESTservice {

  serverUrl = 'http://192.168.99.100:5000';
  pelaajatUrl = this.serverUrl + '/lyodyt';
  joukkueetUrl = this.serverUrl + '/joukkueet';

  constructor(private http: HttpClient) { }

  onHaePelaajat(formData: object) {
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
    const getUrl = '/apu/joukkueet';

    return this.http.get(getUrl);
  }
}
