import axiosSignUp from '../../axios/axios-signup';
import * as actionTypes from './actionTypes';

const auth_sync = (authData) => {
    return {
        type: actionTypes.AUTH,
        authData
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const auth = (credentials) => {
    const authData = {
        ...credentials,
        returnSecureToken: true // tells whether we want the server to return an AUTH TOKEN
    };

    console.log(authData);

    return dispatch => {
        axiosSignUp.post('', authData)
            .then(res => {
                console.log(res);
                dispatch(auth_sync(authData));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    };
};