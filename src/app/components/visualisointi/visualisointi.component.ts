import { Component } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
import { PiilotusService } from 'src/app/services/piilotus.service';

@Component({
  selector: 'app-visualisointi',
  templateUrl: './visualisointi.component.html',
  styleUrls: ['./visualisointi.component.css']
})
export class VisualisointiComponent{

  constructor (private ds: DataService,
    private pis: PiilotusService) {
  }

  get piilotaValikko() : boolean {return this.pis.getPiilotus();}
  get errorMessage() : string {return this.ds.getErrorMsg();}
  get data() : object[] {return this.ds.getData();}
  get loading() : boolean {return this.ds.getLoading();}
}