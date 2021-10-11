import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../../shared/utility';

const initState = {
    token: null,
    localId: null,
    error: null,
    loading: false
};

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_RESET:
            return updateState(state, {
                error: null,
                loading: true
            });

        case actionTypes.AUTH_FAIL:
            return updateState(state, {
                loading: false,
                error: action.error
            });

        case actionTypes.AUTH:
            return updateState(state, {
                error: null,
                loading: false,
                token: action.idToken,
                localId: action.localId
            });

        case actionTypes.LOGOUT:
            return updateState(state, {
                token: null,
                localId: null
            });

        default:
            return updateState(state);
    }
};

export default reducer;