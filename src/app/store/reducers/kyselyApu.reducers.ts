import { KyselyApuActions, EKyselyApuActions } from '../actions/kyselyApu.actions';
import { initialKyselyApuState, IKyselyApuState } from '../state/KyselyApu.state';

export const kyselyApuReducers = (
    state = initialKyselyApuState,
    action: KyselyApuActions,
): IKyselyApuState => {
    switch (action.type) {
        case EKyselyApuActions.GetKyselyApuSuccess: {
            return {
                ...state,
                kyselyApu: action.payload,
            };
        }
        case EKyselyApuActions.TogglePiilotus: {
            return {
                ...state,
                piilotus: !state.piilotus,
            };
        }
        default:
            return state;
    }
};
