import { SortActions, ESortActions } from '../actions/sort.actions';
import { initialSortState, ISortState } from '../state/sort.state';

export const sortReducers = (
    state = initialSortState,
    action: SortActions,
): ISortState => {
    switch (action.type) {
        case ESortActions.SetSortColumn: {
            const previousState: ISortState = {...state};
            const nextState: ISortState = {...state};

            if ( previousState.sarake === action.payload ) {
                nextState.reversed = !previousState.reversed;
            } else {
                nextState.sarake = action.payload;
                nextState.reversed = false;
            }

            return {
                ...previousState,
                ...nextState,
            }
        }
        // case ESortActions.SetSortReverse: {
        //     return {
        //         ...state,
        //         reversed: action.payload,
        //     };
        // }
        default:
            return state;
    }
};
