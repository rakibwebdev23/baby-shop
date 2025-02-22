import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')        
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function(error) {
        // Do something with request error
        return Promise.reject(error);
    });
    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(response => {
        return response;
    }, function(error) {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            logOut()
                .then(() => { })
                .catch(error => console.log(error)
                )
            navigate('/signin');
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;