import apiInst from "..";
import { LoginParameter, LoginResponse, SignUpParameter, SignUpResponse } from "./types";

const API_ENDPOINT = "auth";

export const signUpApi = async(signUpParameter : SignUpParameter) : Promise<SignUpResponse> => {
    return (await apiInst.post(`${API_ENDPOINT}/signup`, signUpParameter)).data;
}

export const loginApi = async(loginParamter: LoginParameter) : Promise<LoginResponse> => {
    return (await apiInst.post(`${API_ENDPOINT}/login`, loginParamter)).data;
}

// // Token Required;
// export const getProfile = async () => {
//    return await apiInst.get(`${API_ENDPOINT}/profile`);
// }