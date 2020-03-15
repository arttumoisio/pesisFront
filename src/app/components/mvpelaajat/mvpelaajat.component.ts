import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
import { PiilotusService } from 'src/app/services/piilotus.service';
@Component({
  selector: 'app-mvpelaajat',
  templateUrl: './mvpelaajat.component.html',
  styleUrls: ['./mvpelaajat.component.css']
})
export class MVPelaajatComponent implements OnInit {

  constructor (private pis: PiilotusService) {}
  
  ngOnInit(){}

  get piilotaValikko() : boolean {
    return this.pis.getPiilotus();
  }
}
