import { Action } from '@ngrx/store';

export enum ESortActions {
    GetSort = '[Sort] Get Sort',
    SetSortColumn = '[Sort] Set Sort Column',
    SetSortReverse = '[Sort] reverse sort',
}

export class GetSort implements Action {
    readonly type = ESortActions.GetSort;
}

export class SetSortColumn implements Action {
    readonly type = ESortActions.SetSortColumn;
    constructor(public payload: string) {}
}

// export class SetSortReverse implements Action {
//     readonly type = ESortActions.SetSortReverse;
//     constructor(public payload: boolean) {}
// }

export type SortActions =
| GetSort
| SetSortColumn
// | SetSortReverse
;
