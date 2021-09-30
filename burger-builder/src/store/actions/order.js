import * as actionTypes from '../actions/actionTypes';
import axiosInstance from '../../axios/axios';

export const setLoadingStateOrder = () => {
    return {
        type: actionTypes.SET_LOADING_STATE_ORDER
    };
};

export const setPurchased = () => {
    return {
        type: actionTypes.SET_PURCHASED
    };
};

const sendOrder_Sync = (orderData, id, error) => {
    return {
        type: actionTypes.SEND_ORDER,
        id: id,
        orderData: orderData,
        error: error
    };
};

export const sendOrder = (orderData) => {
    return (dispatch) => {
        dispatch(setLoadingStateOrder());

        axiosInstance.post('/orders.json', orderData)
            .then((response) => {
                console.log("[BurgerBuilder.js] RESPONSE", response);
                dispatch(sendOrder_Sync(orderData, response.data.name, null));
            })
            .catch((error) => {
                console.error("[BurgerBuilder.js] ERROR", error);
                dispatch(sendOrder_Sync(orderData, null, error));
            });
    }
};
