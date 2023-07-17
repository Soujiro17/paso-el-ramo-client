import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;


export const axiosPublic = axios.create({
    baseURL: baseURL,
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: false
});

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: true
});
