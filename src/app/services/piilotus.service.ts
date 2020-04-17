import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PiilotusService {

  private piilotaValikko: boolean = false;

  getPiilotus(): boolean {
    // console.log('get', this.piilotaValikko);
    return this.piilotaValikko;
  }

  togglePiilota() {
    this.piilotaValikko = !this.piilotaValikko;
    // console.log(this.piilotaValikko);
  }
}
