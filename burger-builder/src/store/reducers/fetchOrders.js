import * as actionTypes from '../actions/actionTypes';
import updateState from '../utility/updateState';

const initState = {
    orders: null,
    loading: null,
    error: null
};

const fetchOrders = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS:
            return updateState(state, { orders: action.data });

        case actionTypes.SET_LOADING_STATE_FETCH_ORDERS:
            return updateState(state, { loading: action.value });

        case actionTypes.ERROR_FETCH_ORDERS:
            return updateState(state, { error: action.error });
        
        default:
            return state;
    }
};

export default fetchOrders;