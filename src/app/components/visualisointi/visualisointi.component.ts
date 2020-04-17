import { Component } from '@angular/core';
import { DataService } from '../../services/dataservice.service';

@Component({
  selector: 'app-visualisointi',
  templateUrl: './visualisointi.component.html',
  styleUrls: ['./visualisointi.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class VisualisointiComponent {

  constructor(private ds: DataService) {
  }

  get errorMessage(): string {return this.ds.getErrorMsg(); }
  get data(): object[] {return this.ds.getData(); }
  get loading(): boolean {return this.ds.getLoading(); }
}
