import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistAC,
    changeFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    TodolistsReducer
} from "./reducers/TodolistsReducer";
import {
    addArrayForTodolistAC,
    addTaskAC,
    changeStatusTaskAC,
    changeTaskTitleAC, removeArrayForTodolistAC,
    removeTaskAC,
    TasksReducer
} from "./reducers/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolists = useSelector<rootReducerType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch()

    function addTodolist(title: string) {
        let newID = v1()
        dispatch(addTodolistAC(title, newID))
        dispatch(addArrayForTodolistAC(newID))
    }
debugger;
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {
                todolists.map(tl => {

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}

                    />
                })
            }

        </div>
    );
}

export default App;
