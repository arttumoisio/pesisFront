import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  firebaseUrl: string = 'https://pesisstats.firebaseio.com/';
  constructor(private http: HttpClient) { }

  onCreatePost(postData: {}){
    console.log("lähti")
    
    this.http.post(
      this.firebaseUrl + 'testit.json' ,
      postData
    ).subscribe(respondseData => {
      console.log(respondseData);
    });

  }
}
