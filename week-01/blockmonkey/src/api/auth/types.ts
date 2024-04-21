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

export interface SignInParameter {
    email: string;
    password: string;
}

export interface SignInResponse {
    accessToken: string;
}