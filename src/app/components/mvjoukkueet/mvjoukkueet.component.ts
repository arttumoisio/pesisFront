import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
@Component({
  selector: 'app-mvjoukkueet',
  templateUrl: './mvjoukkueet.component.html',
  styleUrls: ['./mvjoukkueet.component.css']
})
export class MVJoukkueetComponent implements OnInit {
  
  piilotaValikko = false; // in production this is: false;
  piilotusTeksti = 'Piilota Valikko'; // in production this is: 'Enemmän'

  ngOnInit(){}

  onPiilotaValikko() {
    this.piilotaValikko = !this.piilotaValikko;
    this.piilotusTeksti = this.piilotaValikko ? 'Näytä Valikko' : 'Piilota Valikko';
  }

}