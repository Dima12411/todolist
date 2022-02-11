import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '82614e2c-8769-4d1f-b5b3-8db443975f8d'
    },
    withCredentials: true,
})

type BaseResponseType<T = {} > = {
    resultCode: number
    messages: Array<string>,
    fieldsErrors: Array<string>,
    data: T
}
type GetResponseType = {
    addedDate: string
    id: string
    order: number
    title: string
}


export const todolistApi = {
    getTodolists() {
        return instance.get<Array<GetResponseType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<BaseResponseType<{ item: GetResponseType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
    }
}