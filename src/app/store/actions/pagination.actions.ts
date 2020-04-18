import { Action } from '@ngrx/store';
import { IPaginationState } from '../state/pagination.state';

export enum EPaginationActions {
    SetPagination = '[Pagination] Set Pagination',
    SetPaginationSuccess = '[Pagination] Set Pagination Success',
    SetRecords = '[Pagination] Set Records',
    ChangeShow = '[Pagination] Change Show',
    ChangeCurrentPage = '[Pagination] Change CurrentPage',
    ToLastPage  = '[Pagination] To Last Page',
    ToFirstPage = '[Pagination] To First Page',
    ToPreviousPage = '[Pagination] To Previous Page',
    ToNextPage = '[Pagination] To Next Page',
    ResetPagination = '[Pagination] Reset pagination',
}

export class SetPagination implements Action {
    readonly type = EPaginationActions.SetPagination;
}
export class ToLastPage implements Action {
    readonly type = EPaginationActions.ToLastPage;
}
export class ResetPagination implements Action {
    readonly type = EPaginationActions.ResetPagination;
}
export class ToFirstPage implements Action {
    readonly type = EPaginationActions.ToFirstPage;
}
export class ToPreviousPage implements Action {
    readonly type = EPaginationActions.ToPreviousPage;
}
export class ToNextPage implements Action {
    readonly type = EPaginationActions.ToNextPage;
}

export class SetPaginationSuccess implements Action {
    readonly type = EPaginationActions.SetPaginationSuccess;
    constructor(public payload: IPaginationState) {}
}

export class SetRecords implements Action {
    readonly type = EPaginationActions.SetRecords;
    constructor(public payload: number) {}
}

export class ChangeShow implements Action {
    readonly type = EPaginationActions.ChangeShow;
    constructor(public payload: number) {}
}

export class ChangeCurrentPage implements Action {
    readonly type = EPaginationActions.ChangeCurrentPage;
    constructor(public payload: number) {}
}

export type PaginationActions =
 | SetPagination
 | SetPaginationSuccess
 | SetRecords
 | ChangeCurrentPage
 | ToLastPage
 | ToFirstPage
 | ToPreviousPage
 | ToNextPage
 | ChangeShow
 | ResetPagination
;
