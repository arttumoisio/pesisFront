import { Component, OnInit } from '@angular/core';
import { PiilotusService } from '../../../services/piilotus.service';

@Component({
  selector: 'app-tuomarit',
  templateUrl: './tuomarit.component.html',
  styleUrls: ['./tuomarit.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class TuomaritComponent implements OnInit {

  constructor(private pis: PiilotusService) { }

  ngOnInit(): void {
  }

  get piilotaValikko(): boolean {
    return this.pis.getPiilotus();
  }

}
