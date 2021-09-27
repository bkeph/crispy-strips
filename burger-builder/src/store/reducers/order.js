import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: null,
    error: null,
    purchased: false
};

const order = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SEND_ORDER:
            if(action.error && !action.id)
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };
            else if(!action.error && action.id)
                return {
                    ...state,
                    loading: false,
                    orders: state.orders.concat({
                        id: action.id,
                        data: action.orderData
                    }),
                    error: null,
                    purchased: true
                };
            break;

        case actionTypes.SET_LOADING_STATE:
            return {
                ...state,
                loading: true
            };

        case actionTypes.SET_PURCHASED:
            return {
                ...state,
                purchased: false
            };

        default:
            return state;
    }
};

export default order;