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
  tableData: object[];
  otsikot: string[] = [];
  loading = true;
  firstItem: number;

  reversed: boolean;
  jarjestetty: string;
  errorMessage = '';

  ngOnInit() {
    this.updateData();
    this.sliceData();
    this.dataService.dataChangedEmitter.subscribe(() => {
      this.updateData();
    });
    this.dataService.dataLoadingEmitter.subscribe((loading: boolean) => {
      this.loading = loading;
    });
    this.dataService.paginatorEmitter.subscribe(()=>{
      this.sliceData();
    });
  }

  updateData(){
    this.data = this.dataService.getData();
    console.log(this.data);
    this.jarjestetty = this.dataService.jarjestetty;
    this.reversed = this.dataService.reversed;
    this.selvitaOtsikot();
    this.sliceData();
  }

  sliceData(){
    const pagination = this.dataService.getPagination();
    const start = Number(pagination.start);
    const pages = Number(pagination.pages);
    const show = Number(pagination.show);
    const firstItem = (start-1)*show;
    this.firstItem = firstItem;
    const lastItem = firstItem+show;
    this.tableData = this.data.slice(firstItem,firstItem+show);
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
