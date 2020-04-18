import { Action } from '@ngrx/store';

export enum EPiilotusActions {
    GetPiilotus = '[Piilotus] Get Piilotus',
    GetPiilotusSuccess = '[Piilotus] Get Piilotus Success',
}

export class GetPiilotus implements Action {
    readonly type = EPiilotusActions.GetPiilotus;
}

export class GetPiilotusSuccess implements Action {
    readonly type = EPiilotusActions.GetPiilotusSuccess;
    constructor(public payload: boolean) {}
}

export type PiilotusActions = GetPiilotus | GetPiilotusSuccess;
