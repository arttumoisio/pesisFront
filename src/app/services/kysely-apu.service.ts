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
    2020,
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
    'Voitto',
    'Tappio',
    '3p Voitto',
    '2p Voitto',
    '1p Tappio',
    '0p Tappio',
    'Eritelty',
  ]

  };

  constructor(private dotnetApi: DotnetRESTservice) {
    dotnetApi.haeJoukkueetApu().subscribe(data => {
      const joukkueet: string[] = [];
      for (const elem in data) {
        if (elem) {
          joukkueet.push(data[elem]['joukkue']);
        }
      }
      this.kyselyData.joukkueet = joukkueet;
    });
    dotnetApi.haeVuodetApu().subscribe(data => {
      const kaudet: number[] = [];
      for (const elem in data) {
        if (elem) {
          kaudet.push(Number(data[elem]['kausi']));
        }
      }
      this.kyselyData.kaudet = kaudet;
    });
    dotnetApi.haeSarjaVaiheApu().subscribe(data => {
      const vaiheet: string[] = [];
      for (const elem in data) {
        if (elem) {
          vaiheet.push(String(data[elem]['sarjavaihe']));
        }
      }
      this.kyselyData.peliTyypit = vaiheet;
    });
  }
}
