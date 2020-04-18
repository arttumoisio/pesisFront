import { KyselyApuActions, EKyselyApuActions } from '../actions/KyselyApu.actions';
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
        default:
            return state;
    }
};
