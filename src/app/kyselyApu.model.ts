export interface KyselyApu {
  ulkopeliPaikat: string[];
  lyontijarjestys: number[];
  kaudet: number[];
  peliTyypit: string[];
  joukkueet: string[];
  handness: string[];
}

export class kyselyApuData {
  kysely: KyselyApu = {
    ulkopeliPaikat: [
      "Mikä tahansa",
      "1V",
      "2V",
      "3V",
      "1P",
      "2P",
      "3P",
      "2K",
      "3K",
      "L",
      "J",
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
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
    2009,
    2008,
    2007,
    2006,
    2005,
    2004,
    2003,
  ],

  peliTyypit: [
    "Mikä tahansa",
    "HalliSM",
    "Runkosarja",
    "Pudotuspelit",
    "Itä-Länsi",
  ],

  joukkueet: [
    "Mikä tahansa",
    "Sotkamon Jymy",
    "Manse PP",
    "Seinäjoen Mailajussit",
    "Hyvinkään Tahko",
    "Kankaanpään Maila",
    "Kouvolan Pallonlyöjät",
    "Vimpelin Veto",
    "Kempeleen Kiri",
    "Pattijoen Urheilijat",
    "Siilinjärven Pesis",
    "Joensuun Maila",
    "Kiteen Pallo",
    "Koskenkorvan Urheilijat",
    "Imatran Pallo-Veikot",
  ],

  handness: [
    "Mikä tahansa",
    "Vasen",
    "Oikea",
  ],

  }

}