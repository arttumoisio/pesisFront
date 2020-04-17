import { Component } from '@angular/core';
import { PiilotusService } from '../../../services/piilotus.service';

@Component({
  selector: 'app-mvpelaajat',
  templateUrl: './mvpelaajat.component.html',
  styleUrls: ['./mvpelaajat.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class MVPelaajatComponent {

  constructor(private pis: PiilotusService) {}

  get piilotaValikko(): boolean {
    // console.log(this.pis.getPiilotus());
    return this.pis.getPiilotus();
  }
}
