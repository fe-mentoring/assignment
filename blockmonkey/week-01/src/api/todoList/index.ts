import apiInst from "..";
import { CreateTodoListParamter, CreateTodoListResponse, TodoList, UpdateTodoListParameter, UpdateTodoListResponse } from "./type";

const API_ENDPOINT = "todo";


export const createTodoListApi = async(createTodoList : CreateTodoListParamter, acToken : string) : Promise<CreateTodoListResponse> => {
    const res = await apiInst.post(`${API_ENDPOINT}`, createTodoList, {
        headers: {
            Authorization: `Bearer ${acToken}`
        }
    })
    return res.data;
}

export const getTodoListsApi = async (acToken : string) : Promise<TodoList[]> => {
    const res = await apiInst.get(`${API_ENDPOINT}`, {
        headers: {
            Authorization : `Bearer ${acToken}`
        }
    });
    return res.data;
} 

export const updateTodoListApi = async (updateTodoListParameter: UpdateTodoListParameter, acToken: string) : Promise<UpdateTodoListResponse> => {
    const body = {
        title: updateTodoListParameter.title,
        completed: updateTodoListParameter.completed
    }
    const res = await apiInst.patch(`${API_ENDPOINT}/${updateTodoListParameter.id}`, body, {
        headers: {
            Authorization : `Bearer ${acToken}`
        }
    });
    return res.data;
}

export const removeTodoListApi = async (id: number, acToken: string) => {
    const res = await apiInst.delete(`${API_ENDPOINT}/${id}`, {
        headers: {
            Authorization : `Bearer ${acToken}`
        }
    });
    return res.data;
}