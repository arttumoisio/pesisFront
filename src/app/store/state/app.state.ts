import { RouterReducerState } from '@ngrx/router-store';
import { IFilterState, initialFilterState } from './filters.state';
import { IPaginationState, initialPaginationState } from './pagination.state';
import { IKyselyApuState, initialKyselyApuState } from './kyselyapu.state';
import { initialTableState, ITableState } from './table.state';

export interface IAppState {
    router?: RouterReducerState;
    filters: IFilterState;
    pagination: IPaginationState;
    kyselyApu: IKyselyApuState;
    tableState: ITableState;
}

export const initialAppState: IAppState = {
    filters: initialFilterState,
    pagination: initialPaginationState,
    kyselyApu: initialKyselyApuState,
    tableState: initialTableState,
};

export const getInitialState = () => {
    return initialAppState;
};
