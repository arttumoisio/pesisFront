import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
import { PiilotusService } from 'src/app/services/piilotus.service';
@Component({
  selector: 'app-mvjoukkueet',
  templateUrl: './mvjoukkueet.component.html',
  styleUrls: ['./mvjoukkueet.component.css']
})
export class MVJoukkueetComponent implements OnInit {
  
  piilotaValikko = false;

  constructor (private pis: PiilotusService) {
  }
  
  ngOnInit(){
    this.pis.piilotusEmitter.subscribe(()=>{
      this.piilotaValikko = !this.piilotaValikko
    });
  }
}