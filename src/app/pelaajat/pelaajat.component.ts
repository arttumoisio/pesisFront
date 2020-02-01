import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';

@Component({
  selector: 'app-pelaajat',
  templateUrl: './pelaajat.component.html',
  styleUrls: ['./pelaajat.component.css']
})
export class PelaajatComponent implements OnInit {
  kyselyApu = {
  ulkopeliPaikat: string[],
  lyontijarjestys: number[],
  kaudet: number[],
  peliTyypit: string[],
  joukkueet: string[],
  handness: string[],
  }

  constructor(private kyselyService: FormService) { }

  ngOnInit() {
    this.ulkopeliPaikat = this.kyselyService.ulkopeliPaikat;
    this.lyontijarjestys = this.kyselyService.lyontijarjestys;
    this.kaudet = this.kyselyService.kaudet;
    this.peliTyypit = this.kyselyService.peliTyypit;
    this.joukkueet = this.kyselyService.joukkueet;
    this.handness = this.kyselyService.handness;
  }

}
