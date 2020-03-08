import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-data-paikka',
  templateUrl: './data-paikka.component.html',
  styleUrls: ['./data-paikka.component.css']
})
export class DataPaikkaComponent implements OnInit {

  constructor(private dataService: DataService) { }

  data: object[];
  otsikot: string[] = [];
  loading = true;

  reversed = this.dataService.reversed;
  jarjestetty = this.dataService.jarjestetty;
  errorMessage = '';

  ngOnInit() {
    this.updateData();
    this.dataService.dataChangedEmitter.subscribe(() => {
      this.updateData();
    });
    this.dataService.dataLoadingEmitter.subscribe((loading) => {
      this.loading = loading;
    });
  }

  updateData(){
    this.data = this.dataService.getData();
    this.selvitaOtsikot();
  }

  selvitaOtsikot() {
    if (this.data === undefined || this.data.length === 0 ) {
      this.otsikot = [];
      this.errorMessage = 'Haku ei tuottanut yhtään tulosta.';
    } else {
      this.otsikot = Object.keys(this.data[0]);
      this.errorMessage = '';
    }
  }


  sortTulokset(sarake: string) {
    this.dataService.sortData(sarake);
  }

}
