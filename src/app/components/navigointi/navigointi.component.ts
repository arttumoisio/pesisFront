import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-navigointi',
  templateUrl: './navigointi.component.html',
  styleUrls: ['./navigointi.component.css']
})
export class NavigointiComponent implements OnInit {

  constructor(private ds: DataService) { }

  ngOnInit() {
  }

  piilotaValikko = false; // in production this is: false;
  piilotusTeksti = 'Piilota Valikko'; // in production this is: 'Enemmän'
  onPiilotaValikko() {
    this.piilotaValikko = !this.piilotaValikko;
    this.piilotusTeksti = this.piilotaValikko ? 'Näytä Valikko' : 'Piilota Valikko';
    
    this.ds.piilotusEmitter.emit();
  }


}
