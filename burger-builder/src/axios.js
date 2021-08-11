import axios from "axios";
import Modal from "./components/UI/Modal/Modal";

const axiosInstance = axios.create(
    {
        baseURL: 'https://react-my-burger-e2d75-default-rtdb.europe-west1.firebasedatabase.app'
    }
);

// axiosInstance.interceptors.request.use((request) => {
//     return
// });

export default axiosInstance;