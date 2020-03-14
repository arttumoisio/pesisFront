import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
import { PiilotusService } from 'src/app/services/piilotus.service';

@Component({
  selector: 'app-navigointi',
  templateUrl: './navigointi.component.html',
  styleUrls: ['./navigointi.component.css']
})
export class NavigointiComponent implements OnInit {

  constructor(private pis: PiilotusService) { }

  ngOnInit() {
  }

  piilotaValikko = false; // in production this is: false;
  piilotusTeksti = 'Piilota Valikko'; // in production this is: 'Enemmän'
  onPiilotaValikko() {
    this.piilotaValikko = !this.piilotaValikko;
    this.piilotusTeksti = this.piilotaValikko ? 'Näytä Valikko' : 'Piilota Valikko';
    
    this.pis.piilotusEmitter.emit();
  }


}
