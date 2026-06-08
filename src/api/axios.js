import axios from "axios";

//const VITE_API_URL="https://trackifai-backend1.onrender.com/api"
// ;baseURL : "http://localhost:5000/api"
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if(token){
    config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default API


