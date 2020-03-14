import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
import { PiilotusService } from 'src/app/services/piilotus.service';

@Component({
  selector: 'app-visualisointi',
  templateUrl: './visualisointi.component.html',
  styleUrls: ['./visualisointi.component.css']
})
export class VisualisointiComponent implements OnInit {
  errorMessage = '';
  loading = true;
  piilotaValikko = false;

  constructor (private ds: DataService,
    private pis: PiilotusService) {
  }

  ngOnInit () {
    this.ds.dataLoadingEmitter.subscribe((loading: boolean) => {
      this.loading = loading;
    });
    this.ds.errorEmitter.subscribe((errMsg: string) => {
      this.errorMessage = errMsg;
    });
    this.pis.piilotusEmitter.subscribe(()=>{
      this.piilotaValikko = !this.piilotaValikko;
    });
  }
}