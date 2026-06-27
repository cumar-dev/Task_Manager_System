import axios from "axios";
const Api_Url = "http://localhost:3000/api";

export const api = axios.create({
    baseURL: Api_Url,
    headers: {
        "Content-Type": "application/json",
    },
})
