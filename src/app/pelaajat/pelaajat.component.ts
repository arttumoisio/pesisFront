import { Component, OnInit } from '@angular/core';
import { KyselyApuService } from '../kysely-apu.service';
import { KyselyApu } from '../kyselyApu.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pelaajat',
  templateUrl: './pelaajat.component.html',
  styleUrls: ['./pelaajat.component.css']
})
export class PelaajatComponent implements OnInit {
  // kyselyApu = {
  // ulkopeliPaikat: string[],
  // lyontijarjestys: number[],
  // kaudet: number[],
  // peliTyypit: string[],
  // joukkueet: string[],
  // handness: string[],
  // }

  apu: KyselyApu;

  myForm = new FormControl('');

  constructor(private kyselyService: KyselyApuService) { }

  ngOnInit() {
    this.apu = this.kyselyService.kyselyData
  }

}
