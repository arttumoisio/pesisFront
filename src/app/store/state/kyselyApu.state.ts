import { IKyselyApu } from '../../models/kyselyApu.model';

export interface IKyselyApuState {
    kyselyApu: IKyselyApu;
    piilotus: boolean;
}

export const initialKyselyApuState: IKyselyApuState = {
    piilotus: false,
    kyselyApu: {
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
    },
};
