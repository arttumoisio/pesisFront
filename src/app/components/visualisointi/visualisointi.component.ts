import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-visualisointi',
  templateUrl: './visualisointi.component.html',
  styleUrls: ['./visualisointi.component.css']
})
export class VisualisointiComponent implements OnInit {
  errorMessage = '';
  loading = true;
  piilotaValikko = false;

  constructor (private dataService: DataService) {
  }

  ngOnInit () {
    this.dataService.dataLoadingEmitter.subscribe((loading: boolean) => {
      this.loading = loading;
    });
    this.dataService.errorEmitter.subscribe((errMsg: string) => {
      this.errorMessage = errMsg;
    });
    this.dataService.piilotusEmitter.subscribe(()=>{
      this.piilotaValikko = !this.piilotaValikko;
    });
  }
}