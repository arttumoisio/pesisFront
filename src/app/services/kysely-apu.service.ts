import { Injectable } from '@angular/core';
import { KyselyApu } from '../models/kyselyApu.model';
import { DotnetRESTservice } from './dotnetAPI.service';

@Injectable({
  providedIn: 'root'
})
export class KyselyApuService {

  kyselyData: KyselyApu = {
    ulkopeliPaikat: [
      '1V',
      '2V',
      '3V',
      '1P',
      '2P',
      '3P',
      '2K',
      '3K',
      'L',
      'J',
    ],

  lyontijarjestys: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
  ],

  kaudet: [
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
  ],

  peliTyypit: [
    'HalliSM',
    'Runkosarja',
    'Pudotuspelit',
    'Itä-Länsi',
  ],

  joukkueet: [
    'Sotkamon Jymy',
    'Manse PP',
    'Seinäjoen Mailajussit',
    'Hyvinkään Tahko',
    'Kankaanpään Maila',
    'Kouvolan Pallonlyöjät',
    'Vimpelin Veto',
    'Kempeleen Kiri',
    'Pattijoen Urheilijat',
    'Siilinjärven Pesis',
    'Joensuun Maila',
    'Kiteen Pallo',
    'Koskenkorvan Urheilijat',
    'Imatran Pallo-Veikot',
  ],

  handness: [
    'Vasen',
    'Oikea',
  ],

  paikka: [
    'Koti',
    'Vieras',
    'Eritelty',
  ],

  tulos: [
    'Eritelty',
    'Voitto',
    'Tappio',
    '3p Voitto',
    '2p Voitto',
    '1p Tappio',
    '0p Tappio',
  ],

  lukkarit: [
    'Eritelty',
  ],

  };

  constructor(private dotnetApi: DotnetRESTservice) {
    this.haeVuodet();
    this.haeJoukkueet();
    this.haeSarjavaiheet();
    this.haeLukkarit();
  }

  haeVuodet(){
    this.dotnetApi.haeVuodetApu().subscribe((data: object[]) => {
      // console.log("vuodet tuli", data);
      this.kyselyData.kaudet = [];
      data.map((elem)=>{this.kyselyData.kaudet.push(Number(elem['kausi']));});
    });
  }
  haeSarjavaiheet(alku:any = "1998", loppu:any = "2090"){
    this.dotnetApi.haeSarjaVaiheApu(alku,loppu).subscribe((data: object[]) => {
      // console.log("sarjavaiheet tuli", data);
      this.kyselyData.peliTyypit = [];
      data.map((elem)=>{this.kyselyData.peliTyypit.push(String(elem['sarjavaihe']));});
    });
  }
  haeJoukkueet(alku:any = "1998", loppu:any = "2090"){
    // console.log("haetaan joukkueet",this.kyselyData.joukkueet.length, alku,loppu);
    this.dotnetApi.haeJoukkueetApu(alku,loppu).subscribe((data: object[]) => {
      // console.log("joukkueet tuli", data);
      this.kyselyData.joukkueet = [];
      data.map((elem)=>{this.kyselyData.joukkueet.push(String(elem['joukkue']));});
    });
  }
  haeLukkarit(alku:any = "1998", loppu:any = "2090"){
    // console.log("haetaan lukkarit",this.kyselyData.lukkarit.length, alku,loppu);
    
    this.dotnetApi.haeLukkaritApu(alku,loppu).subscribe((data: object[])=>{
      // console.log("lukkarit tuli", data);
      this.kyselyData.lukkarit = [];
      data.map((elem)=>{this.kyselyData.lukkarit.push(String(elem['lukkari']));});
    });
  }
}
