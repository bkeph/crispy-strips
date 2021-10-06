import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios/axios';

const fetchOrders_Sync = (data) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        data
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(setLoadingStateFetchOrders(true));

        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

        axiosInstance.get(`/orders.json${queryParams}`)
            .then(res => {
                console.log(res);
                dispatch(setLoadingStateFetchOrders(false));
                dispatch(fetchOrders_Sync(res.data ? res.data : "no data"));
            })
            .catch(err => {
                dispatch(setLoadingStateFetchOrders(false));
                dispatch(errorFetchOrders(err));
            });
    }
};

export const setLoadingStateFetchOrders = (value) => {
    return {
        type: actionTypes.SET_LOADING_STATE_FETCH_ORDERS,
        value
    };
};

export const errorFetchOrders = (error) => {
    return {
        type: actionTypes.ERROR_FETCH_ORDERS,
        error
    };
};

export const initOrders = () => {
    return {
        type: actionTypes.INIT_ORDERS
    };
};