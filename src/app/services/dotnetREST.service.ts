import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DotnetRESTservice {

  restUrl: string = 'https://localhost:5001/';
  lyojaUrl: string = "lyodyt/"
  constructor(private http: HttpClient) { }


  onGet(path: string){
    return this.http.get(this.restUrl + path);
  }

  getlyojat(montako?: number) {

    montako = montako ? montako : 0

    return this.onGet(this.lyojaUrl + montako);

  }

  
}
