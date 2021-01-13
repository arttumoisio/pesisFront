import { Action } from '@ngrx/store';
import { ITable } from '../../models/table.interface';
import { ISort } from '../../models/sort.interface';

export enum ETableActions {
    GetTableState = '[Table] Get Table State',
    GetTableStateSuccess = '[Table] Get Table State Success',
    GetTableScroll = '[Table] Get Table Scroll',
    GetTableScrollSuccess = '[Table] Get Table Scroll Success',
}

export class GetTableState implements Action {
    readonly type = ETableActions.GetTableState;
}

export class GetTableStateSuccess implements Action {
    readonly type = ETableActions.GetTableStateSuccess;
    constructor(public payload: ITable) {}
}

export class GetTableScroll implements Action {
    readonly type = ETableActions.GetTableScroll;
}

export class GetTableScrollSuccess implements Action {
    readonly type = ETableActions.GetTableScrollSuccess;
    constructor(public payload: number) {}
}

export type TableActions =
| GetTableState
| GetTableStateSuccess
| GetTableScroll
| GetTableScrollSuccess
;
