import { PiilotusActions, EPiilotusActions } from '../actions/piilotus.actions';
import { initialPiilotusState, IPiilotusState } from '../state/piilotus.state';

export const piilotusReducers = (
    state = initialPiilotusState,
    action: PiilotusActions,
): IPiilotusState => {
    switch (action.type) {
        case EPiilotusActions.GetPiilotusSuccess: {
            return {
                ...state,
                piilotettu: action.payload,
            };
        }
        default:
            return state;
    }
};
