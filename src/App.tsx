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
    //const tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()
    /*let todolistId1 = v1();
    let todolistId2 = v1();*/

    /*let [todolists, todolistDispatch] = useReducer(TodolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])*/

    /*let [tasks, tasksDispatch] = useReducer(TasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });*/

    // function removeTask(id: string, todolistId: string) {
    //     dispatch(removeTaskAC(id, todolistId))
    // }
    // function addTask(title: string, todolistId: string) {
    //     dispatch(addTaskAC(title, todolistId))
    // }
    // function changeFilter(value: FilterValuesType, todolistId: string) {
    //     dispatch(changeFilterAC(value, todolistId))
    // }
    // function changeStatus(todolistId: string, id: string, isDone: boolean) {
    //     dispatch(changeStatusTaskAC(todolistId, id, isDone))
    // }
    // function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    //
    //     dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    // }
    // function removeTodolist(id: string) {
    //     dispatch(removeTodolistAC(id))
    //     dispatch(removeArrayForTodolistAC(id))
    // }
    // function changeTodolistTitle(id: string, title: string) {
    //     dispatch(changeTodolistTitleAC(id, title))
    // }
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
                        //tasks={tasksForTodolist}
                        //removeTask={removeTask}
                        //changeFilter={changeFilter}
                        //addTask={addTask}
                        //changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        //removeTodolist={removeTodolist}
                        //changeTaskTitle={changeTaskTitle}
                        //changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
