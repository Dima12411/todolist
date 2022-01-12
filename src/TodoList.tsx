import React, {ChangeEvent, MouseEvent} from 'react';
import {FilterValuesType, TasksStateType, TodolistType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTaskTitleAC,
    removeArrayForTodolistAC,
    removeTaskAC
} from "./reducers/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducers/TodolistsReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType

}

export function Todolist(props: PropsType) {
    let tasks = useSelector<rootReducerType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()
    function removeTodolist() {
        dispatch(removeTodolistAC(props.id))
        dispatch(removeArrayForTodolistAC(props.id))
    }
    function changeTodolistTitle(title: string) {
        dispatch(changeTodolistTitleAC(props.id, title))
    }

    let tasksForTodolist = tasks;
    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    const onAllClickHandler = () => dispatch(changeFilterAC("all", props.id));
    const onActiveClickHandler = () => dispatch(changeFilterAC("active", props.id));
    const onCompletedClickHandler = () => dispatch(changeFilterAC("completed", props.id));
    debugger;
    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={(title) => dispatch(addTaskAC(props.id,title))}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id));
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeStatusTaskAC(props.id,t.id, newIsDoneValue));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        //changeTaskTitle(t.id, newValue, props.id);
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


