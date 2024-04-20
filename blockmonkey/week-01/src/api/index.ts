import axios from "axios";

const apiInst = axios.create({
    baseURL: ``,
    withCredentials: true,
    responseType: 'json',
    timeout: 50000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
    }
})

export default apiInst;