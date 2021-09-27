import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: null,
    error: null
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
                    error: null
                };
            break;

        case actionTypes.SET_LOADING_STATE:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
};

export default order;