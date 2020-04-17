import { Injectable } from '@angular/core';
import { IKyselyApu } from '../models/kyselyApu.model';
import { DotnetRESTservice } from './dotnetAPI.service';

@Injectable({
  providedIn: 'root',
})
export class KyselyApuService {

  kyselyData: IKyselyApu = {
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
    2020,
    1994,
    ],

    peliTyypit: [
    'HalliSM',
    'Runkosarja',
    'Pudotuspelit',
    'Itä-Länsi',
    ],

    sarjat: [
    'Miesten superpesis',
    ],

    joukkueet: [
    'Sotkamon Jymy',
    // 'Manse PP',
    // 'Seinäjoen Mailajussit',
    // 'Hyvinkään Tahko',
    // 'Kankaanpään Maila',
    // 'Kouvolan Pallonlyöjät',
    // 'Vimpelin Veto',
    // 'Kempeleen Kiri',
    // 'Pattijoen Urheilijat',
    // 'Siilinjärven Pesis',
    // 'Joensuun Maila',
    // 'Kiteen Pallo',
    // 'Koskenkorvan Urheilijat',
    'Imatran Pallo-Veikot',
    ],

    kotijoukkueet: [
    ],

    vierasjoukkueet: [
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
    this.haeSarjat();
    this.haeLukkarit();
  }

  haeVuodet() {
    this.dotnetApi.haeVuodetApu().subscribe((data: object[]) => {
      // console.log("vuodet tuli", data);
      this.kyselyData.kaudet = data.map((elem: {kausi: number; }) => elem.kausi);
    });
  }
  haeSarjavaiheet(alku: any = '1994', loppu: any = '2090') {
    this.dotnetApi.haeSarjaVaiheApu(alku, loppu).subscribe((data: object[]) => {
      // console.log("sarjavaiheet tuli", data);
      this.kyselyData.peliTyypit = data.map((elem: {sarjavaihe: string; }) => elem.sarjavaihe);
    });
  }
  haeSarjat(alku: any = '1994', loppu: any = '2090') {
    this.dotnetApi.haeSarjaApu(alku, loppu).subscribe((data: object[]) => {
      // console.log("sarjavaiheet tuli", data);
      this.kyselyData.sarjat = data.map((elem: {sarja: string; }) => elem.sarja);
    });
  }
  haeJoukkueet(
    alku: any = '1990',
    loppu: any = '2090',
    sarja: string = 'Miesten superpesis',
    sarjavaihe: string = '') {
    // console.log('haetaan joukkueet', this.kyselyData.joukkueet.length, alku, loppu);
    this.dotnetApi.haeJoukkueetApu(alku, loppu, sarja, sarjavaihe).subscribe((data: object[]) => {
      // console.log('joukkueet tuli', data);
      this.kyselyData.kotijoukkueet = [];
      this.kyselyData.vierasjoukkueet = [];
      this.kyselyData.joukkueet = data.map((elem: {joukkue: string; koti: number; vieras: number; }) => {
        if (elem.koti === 1) {this.kyselyData.kotijoukkueet.push(elem.joukkue); }
        if (elem.vieras === 1) {this.kyselyData.vierasjoukkueet.push(elem.joukkue); }
        return elem.joukkue;
      });
      // console.log(this.kyselyData.kotijoukkueet);
      // console.log(this.kyselyData.vierasjoukkueet);
    });
  }
  haeLukkarit(
    alku: any = '1990',
    loppu: any = '2090',
    sarja: string = 'Miesten superpesis',
    sarjavaihe: string = '',
  ) {
    // console.log('haetaan lukkarit', this.kyselyData.lukkarit.length, alku, loppu);

    this.dotnetApi.haeLukkaritApu(alku, loppu, sarja, sarjavaihe).subscribe((data: object[]) => {
      // console.log('lukkarit tuli', data);
      this.kyselyData.lukkarit = data.map((elem: {lukkari: string; }) => elem.lukkari);
    });
  }
}
