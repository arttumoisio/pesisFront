import { RouterReducerState } from '@ngrx/router-store';
import { IFilterState, initialFilterState } from './filters.state';
import { IPaginationState, initialPaginationState } from './pagination.state';
import { IKyselyApuState, initialKyselyApuState } from './kyselyApu.state';
import { ITableState, initialTableState } from './table.state';
import { ISortState, initialSortState } from './sort.state';

export interface IAppState {
    router?: RouterReducerState;
    filters: IFilterState;
    pagination: IPaginationState;
    kyselyApu: IKyselyApuState;
    table: ITableState;
    sort: ISortState;
}

export const initialAppState: IAppState = {
    filters: initialFilterState,
    pagination: initialPaginationState,
    kyselyApu: initialKyselyApuState,
    table: initialTableState,
    sort: initialSortState,
};

export const getInitialState = () => {
    return initialAppState;
};
