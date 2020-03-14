import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PiilotusService {

  
  piilotusEmitter = new EventEmitter();
}
