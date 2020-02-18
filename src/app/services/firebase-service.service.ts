import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  firebaseUrl = 'https://pesisstats.firebaseio.com/';
  constructor(private http: HttpClient) { }

  onCreatePost(postData: {}, path: string) {
    console.log('lähti');
    this.http.post(
      this.firebaseUrl + path ,
      postData
    ).subscribe(respondseData => {
      console.log(respondseData);
    });

  }

  onCreatePelaajaPost(postData: {}) {
    this.onCreatePost(postData, 'pelaajaHaku.json' );
  }

  onCreateJoukkuePost(postData: {}) {
    this.onCreatePost(postData, 'joukkueHaku.json' );
  }

  onHaePelaajat(formData: object) {
    const getUrl = 'https://localhost:5001/pelaajat';
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
    return this.http.get(getUrl, {params});
  }


  onHaeJoukkueet(formData: object) {
    const getUrl = 'https://localhost:5001/joukkueet';
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
    return this.http.get(getUrl, {params});
  }

  haeJoukkueetApu(vuosiAlkaen = 2000, vuosiLoppuen = 2020) {
    const getUrl = 'https://localhost:5001/apu/joukkueet';

    return this.http.get(getUrl);
  }

  onAsyncFetchData(path: string) {
    return this.http.get(this.firebaseUrl + path)
    .subscribe();
  }
}
