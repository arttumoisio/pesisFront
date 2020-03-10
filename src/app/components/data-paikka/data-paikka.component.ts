import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
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
    this.jarjestetty = this.dataService.jarjestetty;
    this.reversed = this.dataService.reversed;
    this.selvitaOtsikot();
    this.sliceData();
  }
  
  sliceData(){
    const pagination = this.dataService.getPagination();
    const start = Number(pagination.start);
    const show = Number(pagination.show);
    const firstItem = (start-1)*show;
    this.firstItem = firstItem;
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

  offsetTop: number = undefined;
  setOffSetTopOnce(ost: number){
    if (this.offsetTop === undefined){
      this.offsetTop = ost + window.scrollY;
    }
    return this.offsetTop;
  }
  showSticky = false;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const theadElem: HTMLElement = document.getElementById("tablehead");
    const {y} = theadElem.getBoundingClientRect();
    const w = window.scrollY
    this.setOffSetTopOnce(y);
    if (w >= this.offsetTop) {
      this.showSticky = true;
    } else {
      this.showSticky = false;
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.offsetTop = undefined;
  }
  
  tablepos: number = 0;
  tablepospx: string = "px"
  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    const tableElem: HTMLElement = document.getElementById("datataulu");
    const x = event.deltaX;
    this.tablepos -= x;
    if (this.tablepos > 0){
      this.tablepos = 0;
    } else if (this.tablepos < document.body.scrollWidth-tableElem.scrollWidth) {
      this.tablepos = document.body.scrollWidth-tableElem.scrollWidth;
    }this.tablepospx = this.tablepos + 'px';
  }
  touchStart: number;
  distancex: number = 0;
  previousx: number;
  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStart = event.targetTouches.item(0).screenX;
    this.previousx = 0;
  }
  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const x = event.touches.item(0).screenX - this.touchStart;
    const absMove = this.previousx - x;
    const tableElem: HTMLElement = document.getElementById("datataulu");
    this.tablepos -= absMove;
    if (this.tablepos > 0){
      this.tablepos = 0;
    } else if (this.tablepos < document.body.scrollWidth-tableElem.scrollWidth) {
      this.tablepos = document.body.scrollWidth-tableElem.scrollWidth;
    }
    this.tablepospx = this.tablepos + 'px';
    this.previousx = x;
  }
}