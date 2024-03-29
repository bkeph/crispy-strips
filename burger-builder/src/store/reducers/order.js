import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: null,
    error: null,
    purchased: false
};

const sendOrder = (state, action) => {
    if (action.error && !action.id)
        return updateState(state, {
            loading: false,
            error: action.error
        });
    else if (!action.error && action.id)
        return updateState(state, {
            loading: false,
            orders: state.orders.concat({
                id: action.id,
                data: action.orderData
            }),
            error: null,
            purchased: true
        });
};

const setLoadingState = (state) => {
    return updateState(state, { loading: true });
};

const setPurchased = (state) => {
    return updateState(state, { purchased: false })
};

// Reducer
const order = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEND_ORDER:
            return sendOrder(state, action);

        case actionTypes.SET_LOADING_STATE_ORDER:
            return setLoadingState(state);

        case actionTypes.SET_PURCHASED:
            return setPurchased(state);

        default:
            return state;
    }
};

export default order;