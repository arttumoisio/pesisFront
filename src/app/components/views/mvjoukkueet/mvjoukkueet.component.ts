import { Component } from '@angular/core';
import { PiilotusService } from '../../../services/piilotus.service';
@Component({
  selector: 'app-mvjoukkueet',
  templateUrl: './mvjoukkueet.component.html',
  styleUrls: ['./mvjoukkueet.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class MVJoukkueetComponent{

  constructor(private pis: PiilotusService) {
  }

  get piilotaValikko(): boolean {return this.pis.getPiilotus(); }
}
