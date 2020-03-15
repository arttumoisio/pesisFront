import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PiilotusService {

  private piilotaValikko: boolean = false;

  getPiilotus():boolean{
    return this.piilotaValikko;
  }

  togglePiilota(){
    this.piilotaValikko = !this.piilotaValikko;
  }
}
