import axios from "axios";

export const axiosAuthSignUp = axios.create({
        baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyIrGwZdXQXNtMdTeV_oy0OlfFn5cCh_g'
});

export const axiosAuthSignIn = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyIrGwZdXQXNtMdTeV_oy0OlfFn5cCh_g'
});