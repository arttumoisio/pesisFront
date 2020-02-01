import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-paikka',
  templateUrl: './data-paikka.component.html',
  styleUrls: ['./data-paikka.component.css']
})
export class DataPaikkaComponent implements OnInit {

  constructor(private firebase: FirebaseServiceService,
    private http: HttpClient) { }

  dataListana = [];

  ngOnInit() {
    
    this.http.get(this.firebase.firebaseUrl + 'testit.json')
    .subscribe( kyselyData =>{

      // Step 1. Get all the object keys.
      if (kyselyData == undefined || null) {return};
      let evilResponseProps = Object.keys(kyselyData);

      // Step 3. Iterate throw all keys.
      for (let prop of evilResponseProps) {
        this.dataListana.push(kyselyData[prop]);
      }

    });



  }

  onLog(){
    console.log(this.dataListana);
  }

}
