import { Action } from '@ngrx/store';
import { ISuodin, IFilter } from '../../models/filters.interface';

export enum EFilterActions {
    GetFilters = '[Filters] Get Filters',
    GetFiltersSuccess = '[Filters] Get Filters Success',
    GetSuodin = '[Filters] Get Suodin',
    GetSuodinSuccess = '[Filters] Get Suodin Success',
}

export class GetFilters implements Action {
    readonly type = EFilterActions.GetFilters;
}

export class GetFiltersSuccess implements Action {
    readonly type = EFilterActions.GetFiltersSuccess;
    constructor(public payload: IFilter[]) {}
}

export class GetSuodin implements Action {
    readonly type = EFilterActions.GetSuodin;
}

export class GetSuodinSuccess implements Action {
    readonly type = EFilterActions.GetSuodinSuccess;
    constructor(public payload: ISuodin) {}
}

export type FiltersActions =
 | GetFilters
 | GetFiltersSuccess
 | GetSuodin
 | GetSuodinSuccess
;
