import { FiltersActions, EFilterActions } from '../actions/filters.actions';
import { initialFilterState, IFilterState } from '../state/filters.state';

export const FilterReducers = (
    state = initialFilterState,
    action: FiltersActions,
): IFilterState => {
    switch (action.type) {
        case EFilterActions.GetFiltersSuccess: {
            return {
                ...state,
                filters: action.payload,
            };
        }
        case EFilterActions.GetSuodinSuccess: {
            return {
                ...state,
                suodin: action.payload,
            };
        }
        default:
            return state;
    }
};
