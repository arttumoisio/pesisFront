import { RouterReducerState } from '@ngrx/router-store';
import { IFilterState, initialFilterState } from './filters.state';
import { IPaginationState, initialPaginationState } from './pagination.state';
import { IPiilotusState, initialPiilotusState } from './piilotus.state';
import { IKyselyApuState, initialKyselyApuState } from './kyselyApu.state';
import { initialTableState, ITableState } from './table.state';

export interface IAppState {
    router?: RouterReducerState;
    filters: IFilterState;
    pagination: IPaginationState;
    // piilotus: IPiilotusState;
    // kyselyApu: IKyselyApuState;
    tableState: ITableState;
}

export const initialAppState: IAppState = {
    filters: initialFilterState,
    pagination: initialPaginationState,
    // piilotus: initialPiilotusState,
    // kyselyApu: initialKyselyApuState,
    tableState: initialTableState,
};

export const getInitialState = () => {
    return initialAppState;
};
