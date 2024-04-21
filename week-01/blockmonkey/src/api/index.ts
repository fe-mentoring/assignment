import axios from "axios";

const apiInst = axios.create({
    baseURL: `https://tender-fannie-fe-mentoring.koyeb.app/v1`,
    responseType: 'json',
    timeout: 50000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
    }
})

export default apiInst;