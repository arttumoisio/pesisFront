import { TableActions, ETableActions } from '../actions/table.actions';
import { initialTableState, ITableState } from '../state/table.state';

export const tableDataReducers = (
    state = initialTableState,
    action: TableActions,
): ITableState => {
    switch (action.type) {
        case ETableActions.GetTableStateSuccess: {
            return {
                ...state,
                tableState: action.payload,
            };
        }
        case ETableActions.GetTableScrollSuccess: {
            return {
                ...state,
                tableScroll: action.payload,
            };
        }
        default:
            return state;
    }
};
