import apiInst from "..";
import { CreateTodoListParamter, CreateTodoListResponse, TodoList, UpdateTodoListParameter, UpdateTodoListResponse } from "./type";

const API_ENDPOINT = "todo";


export const createTodoList = async(createTodoList : CreateTodoListParamter) : Promise<CreateTodoListResponse> => {
    return (await apiInst.post(`${API_ENDPOINT}`, createTodoList)).data;
}

export const getTodoLists = async () : Promise<TodoList[]> => {
    return (await apiInst.get(`${API_ENDPOINT}`)).data;
} 

export const updateTodoList = async (updateTodoListParameter : UpdateTodoListParameter) : Promise<UpdateTodoListResponse> => {
    const body = {
        title: updateTodoListParameter.title,
        completed: updateTodoListParameter.completed
    }
    return (await apiInst.patch(`${API_ENDPOINT}/${updateTodoListParameter.id}`, body)).data;
}

// export const getTodoLists = async() => {
//     return (await apiInst.get(`${API_ENDPOINT}`)).data;
// }

export const removeTodoList = async (id : number) => {
    return (await apiInst.delete(`${API_ENDPOINT}/${id}`)).data;
}