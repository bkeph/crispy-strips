import axios from "axios";

const axiosInstance = axios.create(
    {
        baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyIrGwZdXQXNtMdTeV_oy0OlfFn5cCh_g'
    }
);

export default axiosInstance;