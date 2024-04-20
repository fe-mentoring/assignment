import apiInst from "..";
import { SignInParameter, SignInResponse, SignUpParameter, SignUpResponse } from "./types";

const API_ENDPOINT = "auth";

export const signUpApi = async(signUpParameter : SignUpParameter) : Promise<SignUpResponse> => {
    return (await apiInst.post(`${API_ENDPOINT}/signup`, signUpParameter)).data;
}

export const signInApi = async(loginParamter: SignInParameter) : Promise<SignInResponse> => {
    return (await apiInst.post(`${API_ENDPOINT}/login`, loginParamter)).data;
}

// Token Required;
export const getProfileApi = async (acToken: string) => {
    const res = await apiInst.get(`${API_ENDPOINT}/profile`, {
        headers: {
            Authorization: `Bearer ${acToken}`,
        }
    });
    return res.data;
}