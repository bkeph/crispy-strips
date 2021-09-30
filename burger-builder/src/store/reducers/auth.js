import * as actionTypes from '../actions/actionTypes';
import updateState from '../utility/updateState';

const initState = {
    token: null,
    localId: null,
    error: null,
    loading: null
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

        default:
            return updateState(state);
    }
};

export default reducer;