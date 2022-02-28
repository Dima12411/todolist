import { v1 } from 'uuid';
import {Dispatch} from "redux";
import {todolistApi} from "../api/todolist-api";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOS':
            return action.todolists.map ((tl) => {
                return {...tl, filter: 'all'}
            })
        default:
            return state;
    }
}

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodosAC>

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id}) as const
export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()}) as const
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id, filter}) as const
export const setTodosAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOS', todolists}) as const

export const setTodosThunk = (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then((res) => {
            let todos = res.data
            dispatch(setTodosAC(todos))
        })
}