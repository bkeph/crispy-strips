import { axiosAuthSignUp, axiosAuthSignIn } from '../../axios/axios-auth';
import * as actionTypes from './actionTypes';

const auth_sync = (idToken, localId) => {
    return {
        type: actionTypes.AUTH,
        idToken,
        localId
    };
};

const authReset = () => {
    return {
        type: actionTypes.AUTH_RESET
    };
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const auth = (credentials, isSignup) => {
    const authData = {
        ...credentials,
        returnSecureToken: true // tells whether we want the server to return an AUTH TOKEN
    };

    const axiosProcess = isSignup
        ?   axiosAuthSignUp
        :   axiosAuthSignIn;

    return dispatch => {
        dispatch(authReset());

        axiosProcess.post('', authData)
            .then(res => {
                const date = new Date(new Date().getTime() + res.data.expiresIn * 1000);

                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', date);

                dispatch(logoutTimeout(res.data.expiresIn));
                dispatch(auth_sync(res.data.idToken, res.data.localId));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    };
};

export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: actionTypes.LOGOUT
    };
};

const logoutTimeout = (expirationTimeInSeconds) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTimeInSeconds * 1000);
    };
};

export const checkForToken = () => {
    return dispatch => {
        const currentDate = new Date();
        const storeTokenDate = new Date(localStorage.getItem('expirationDate')); // transformed string in localStorage to Date
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if(!token) {
            dispatch(logout());
        } else {
            if(currentDate <= storeTokenDate) {
                dispatch(logoutTimeout((storeTokenDate.getTime() - new Date().getTime()) / 1000)); // pass the time left until token expiration
                dispatch(auth_sync(token, userId));
            } else {
                dispatch(logout());
            }
        }
    };
};