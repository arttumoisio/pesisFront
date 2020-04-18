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
        case EFilterActions.AddFilter: {
            return {
                ...state,
                filters: [...state.filters, action.payload],
            };
        }
        case EFilterActions.ResetFilters: {
            return {
                ...initialFilterState,
            };
        }
        case EFilterActions.DeleteFilter: {
            const index = Number(action.payload);
            const newFilters = [...state.filters];
            newFilters.splice(index, 1);
            return {
                ...state,
                filters: newFilters,
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
