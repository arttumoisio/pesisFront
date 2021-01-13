import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { FilterReducers } from './filters.reducers';
import { paginationReducers } from './pagination.reducers';
import { kyselyApuReducers } from './kyselyApu.reducers';
import { tableDataReducers } from './table.reducers';
import { sortReducers } from './sort.reducers';

export const appReducers: ActionReducerMap<IAppState, any> =  {
    filters: FilterReducers,
    pagination: paginationReducers,
    kyselyApu: kyselyApuReducers,
    table: tableDataReducers,
    sort: sortReducers,
};
