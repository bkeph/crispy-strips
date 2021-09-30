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
                dispatch(auth_sync(res.data.idToken, res.data.localId));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    };
};