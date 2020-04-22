import { Action } from '@ngrx/store';
import { IKyselyApu } from '../../models/kyselyApu.model';

export enum EKyselyApuActions {
    GetKyselyApu = '[KyselyApu] Get KyselyApu',
    GetKyselyApuSuccess = '[KyselyApu] Get KyselyApu Success',
    TogglePiilotus = '[KyselyApu] Change piilotus to !piilotus',
}

export class GetKyselyApu implements Action {
    readonly type = EKyselyApuActions.GetKyselyApu;
}

export class TogglePiilotus implements Action {
    readonly type = EKyselyApuActions.TogglePiilotus;
}

export class GetKyselyApuSuccess implements Action {
    readonly type = EKyselyApuActions.GetKyselyApuSuccess;
    constructor(public payload: IKyselyApu) {}
}

export type KyselyApuActions =
 | GetKyselyApu
 | GetKyselyApuSuccess
 | TogglePiilotus
 ;
