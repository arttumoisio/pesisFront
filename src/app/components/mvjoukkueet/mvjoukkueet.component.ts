import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
@Component({
  selector: 'app-mvjoukkueet',
  templateUrl: './mvjoukkueet.component.html',
  styleUrls: ['./mvjoukkueet.component.css']
})
export class MVJoukkueetComponent implements OnInit {
  
  piilotaValikko = false;

  constructor (private ds: DataService) {
  }
  
  ngOnInit(){
    this.ds.piilotusEmitter.subscribe(()=>{
      this.piilotaValikko = !this.piilotaValikko
    });
  }
}