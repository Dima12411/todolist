import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


let todolistId1 = v1();
let todolistId2 = v1();
let initialState: Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

export const TodolistsReducer = (state = initialState, action: allTodolistActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.payload.id)
        }
        case "CHANGE-FILTER-TODOLIST": {
            state.map(m => m.id === action.payload.id ? {...action, filter: action.payload.filter} : m)
            return state
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return ([newTodolist,...state])
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(m => m.id === action.payload.id
                ? {...m, title: action.payload.title} : m)

        }
        default:
            return state
    }
}

type allTodolistActionType = removeTodolistType | changeFilterTodolistType | addTodolistType | changeTodolistTitleType

type removeTodolistType = ReturnType<typeof removeTodolistAC>
type changeFilterTodolistType = ReturnType<typeof changeFilterAC>
type addTodolistType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id: id
        }
    } as const
}
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE-FILTER-TODOLIST",
        payload: {
            filter: value,
            id: todolistId
        }
    } as const
}
export const addTodolistAC = (title: string, ID: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            id: ID,
            title: title
        }
    } as const
}
export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id: todolistID,
            title: newTitle
        }
    } as const
}
