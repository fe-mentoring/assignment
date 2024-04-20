export interface TodoList {
    id: number;
    title: string;
    completed: boolean
    user: {
        id: number;
    }
}

export interface CreateTodoListParamter {
    title: string;
}

export interface CreateTodoListResponse {
    id: number;
}

export interface UpdateTodoListParameter {
    id: number;
    title: string;
    completed: boolean;
}

export interface UpdateTodoListResponse {
    id: number;
}