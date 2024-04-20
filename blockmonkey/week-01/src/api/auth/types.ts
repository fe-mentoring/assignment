export interface SignUpParameter {
    email: string;
    username: string;
    password: string;
}

export interface SignUpResponse {
    user: {
        id : number
    }
}

export interface LoginParameter {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}