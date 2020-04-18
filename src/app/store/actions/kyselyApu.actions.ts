import { Action } from '@ngrx/store';
import { IKyselyApu } from '../../models/KyselyApu.model';

export enum EKyselyApuActions {
    GetKyselyApu = '[KyselyApu] Get KyselyApu',
    GetKyselyApuSuccess = '[KyselyApu] Get KyselyApu Success',
}

export class GetKyselyApu implements Action {
    readonly type = EKyselyApuActions.GetKyselyApu;
}

export class GetKyselyApuSuccess implements Action {
    readonly type = EKyselyApuActions.GetKyselyApuSuccess;
    constructor(public payload: IKyselyApu) {}
}

export type KyselyApuActions = GetKyselyApu | GetKyselyApuSuccess;
