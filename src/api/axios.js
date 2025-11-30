import axios from "axios";

const api  = axios.create({
    baseURL:"https://traveleaseserver.vercel.app"
})

export default api;