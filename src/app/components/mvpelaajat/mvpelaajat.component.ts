import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-mvpelaajat',
  templateUrl: './mvpelaajat.component.html',
  styleUrls: ['./mvpelaajat.component.css']
})
export class MVPelaajatComponent implements OnInit {
  
  piilotaValikko = false; // in production this is: false;
  piilotusTeksti = 'Piilota Valikko'; // in production this is: 'Enemmän'

  ngOnInit(){}

  onPiilotaValikko() {
    this.piilotaValikko = !this.piilotaValikko;
    this.piilotusTeksti = this.piilotaValikko ? 'Näytä Valikko' : 'Piilota Valikko';
  }
}
