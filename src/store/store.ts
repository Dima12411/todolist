import {combineReducers, createStore} from "redux";
import {TasksReducer} from "../reducers/TasksReducer";
import {TodolistsReducer} from "../reducers/TodolistsReducer";


const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: TodolistsReducer
    }
)

export type rootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)