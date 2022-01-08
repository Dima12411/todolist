import {TasksStateType} from "../App";
import {v1} from "uuid";


export const TasksReducer = (state: TasksStateType, action: allTasksActionType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {
                ...state,
                [action.payload.id]: [newTask, ...state[action.payload.id]]
            }
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(f => f.id !== action.payload.id)
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(m => m.id === action.payload.taskID
                    ? {...m, isDone: action.payload.isDone} : m)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID].map(m => m.id === action.payload.taskID
                    ? {...m, title: action.payload.title} : m)
            }
        }
        case "ADD-ARRAY-TODOLIST": {
            return {
                ...state,
                [action.payload.id]: []
            }
        }
        case "REMOVE-ARRAY-TODOLIST": {
            delete state[action.payload.id]
        }
        default:
            return state

    }
}

type allTasksActionType = addTaskType | removeTaskType
    | changeStatusTaskType | changeTaskTitleType | addArrayForTodolistType | removeArrayForTodolistType

type addTaskType = ReturnType<typeof addTaskAC>
type removeTaskType = ReturnType<typeof removeTaskAC>
type changeStatusTaskType = ReturnType<typeof changeStatusTaskAC>
type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type addArrayForTodolistType = ReturnType<typeof addArrayForTodolistAC>
type removeArrayForTodolistType = ReturnType<typeof removeArrayForTodolistAC>

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title: title,
            id: todolistId
        }
    } as const
}
export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id: taskID,
            todolistID: todolistID
        }
    } as const
}
export const changeStatusTaskAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistID: todolistID,
            taskID: taskID,
            isDone: isDone
        }
    } as const
}
export const changeTaskTitleAC = (taskID: string, newTitle: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todoID: todolistId,
            taskID: taskID,
            title: newTitle
        }
    } as const
}
export const addArrayForTodolistAC = (todolistID: string) => {
    return {
        type: "ADD-ARRAY-TODOLIST",
        payload: {
            id: todolistID
        }
    } as const
}
export const removeArrayForTodolistAC = (id: string) => {
    return {
        type: "REMOVE-ARRAY-TODOLIST",
        payload: {
            id: id
        }
    } as const
}