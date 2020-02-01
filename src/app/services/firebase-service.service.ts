import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  firebaseUrl: string = 'https://pesisstats.firebaseio.com/';
  constructor(private http: HttpClient) { }

  onCreatePost(postData: {}, path: string){
    console.log("lähti")
    
    this.http.post(
      this.firebaseUrl + path ,
      postData
    ).subscribe(respondseData => {
      console.log(respondseData);
    });

  }

  onCreatePelaajaPost(postData: {}){
    this.onCreatePost(postData, "pelaajaHaku.json")
  }

  onCreateJoukkuePost(postData: {}){
    this.onCreatePost(postData, "joukkueHaku.json")
  }

  onAsyncFetchData(path: string) {

    return this.http.get(this.firebaseUrl + path)
    .subscribe();

  }

  
}
