import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataService } from './dataservice.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DotnetRESTservice {

  private serverUrl: string;
  private pelaajatUrl: string;
  private joukkueetUrl: string;
  private tuomaritUrl: string;

  constructor(
    private http: HttpClient,
    private ds: DataService,
    ) {
    this.serverUrl = environment.serverUrl;
    this.pelaajatUrl = this.serverUrl + '/pelaajat';
    this.joukkueetUrl = this.serverUrl + '/joukkueet';
    this.tuomaritUrl = this.serverUrl + '/tuomarit';
  }

  handleRequest(requestObs) {
    requestObs
    .pipe(catchError(this.handleError))
    .subscribe((responseData) => {
      // console.log(responseData);
      this.handleTableData(responseData);
    });
  }

  handleTableData(responseData) {
    const data = [];
    for (const elem in responseData) {
      if (elem) {
        data.push(responseData[elem]);
      }
    }
    this.ds.setRawData(data);
  }

  formDataToHttpParams(formData: object): HttpParams {
    this.ds.startLoading();
    let params = new HttpParams();
    for (const elem in formData) {
      if (elem) {
        const param: string = elem.toString();
        const value: string = formData[elem].toString();
        params = params.append(param, value);
      }
    }
    // console.log(params.toString());
    return params;
  }

  private handleError(error: HttpErrorResponse) {
    this.ds?.setRawData([]);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later. PLEASE');
  };

  onHaePelaajat(formData: object) {
    const params = this.formDataToHttpParams(formData);
    this.handleRequest(
      this.http.get(this.pelaajatUrl, {params}),
    );
  }

  onHaeJoukkueet(formData: object) {
    const params = this.formDataToHttpParams(formData);
    this.handleRequest(
      this.http.get(this.joukkueetUrl, {params}),
    );
  }

  onHaeTuomarit(formData: object) {
    // console.log("tuomariform before fetch", formData);
    const params = this.formDataToHttpParams(formData);
    // console.log("TUomariparams: ", params);
    this.handleRequest(
      this.http.get(this.tuomaritUrl, {params}),
    );
  }

  haeJoukkueetApu(
    vuosiAlkaen: string = '1993',
    vuosiLoppuen: string = '2020',
    sarja: string = 'Miesten superpesis',
    sarjavaihe: string = '') {
    // console.log("jouk", vuosiAlkaen, vuosiLoppuen);

    let params = new HttpParams();
    params = params.append('kaudetAlku', vuosiAlkaen.toString());
    params = params.append('kaudetLoppu', vuosiLoppuen.toString());
    params = params.append('sarja', sarja.toString());
    params = params.append('sarjavaihe', sarjavaihe.toString());
    const getUrl = this.serverUrl + '/apu/joukkueet';

    // console.log("joukkueet params:", params);
    return this.http.get(getUrl, {params});
  }
  haeLukkaritApu(
    vuosiAlkaen: string = '1993',
    vuosiLoppuen: string = '2020',
    sarja: string = 'Miesten superpesis',
    sarjavaihe: string = '') {
    // console.log("lukk", vuosiAlkaen, vuosiLoppuen);
    let params = new HttpParams();
    params = params.append('kaudetAlku', vuosiAlkaen.toString());
    params = params.append('kaudetLoppu', vuosiLoppuen.toString());
    params = params.append('sarja', sarja.toString());
    params = params.append('sarjavaihe', sarjavaihe.toString());
    const getUrl = this.serverUrl + '/apu/lukkarit';
    // console.log("kohta lukkareiteteasd");
    // console.log("lukkari params:", params);
    return this.http.get(getUrl, {params});
  }
  haeVuodetApu() {
    const getUrl = this.serverUrl + '/apu/vuodet';
    return this.http.get(getUrl);
  }
  haeSarjaVaiheApu(vuosiAlkaen: string = '1993', vuosiLoppuen: string = '2020') {
    let params = new HttpParams();
    params = params.append('kaudetAlku', vuosiAlkaen.toString());
    params = params.append('kaudetLoppu', vuosiLoppuen.toString());
    const getUrl = this.serverUrl + '/apu/sarjavaihe';
    return this.http.get(getUrl, {params});
  }

  haeSarjaApu(vuosiAlkaen: string = '1993', vuosiLoppuen: string = '2020') {
    let params = new HttpParams();
    params = params.append('kaudetAlku', vuosiAlkaen.toString());
    params = params.append('kaudetLoppu', vuosiLoppuen.toString());
    const getUrl = this.serverUrl + '/apu/sarja';
    return this.http.get(getUrl, {params});
  }
  haeDataa() {
    const getUrl = this.pelaajatUrl;
    let params = new HttpParams();
    params = params.append('kaudetAlku', '2019');
    params = params.append('kaudetLoppu', '2019');
    return this.http.get(getUrl, {params});
  }
}
