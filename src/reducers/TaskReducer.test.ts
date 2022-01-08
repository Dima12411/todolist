import {v1} from "uuid";
import {useReducer} from "react";
import {TasksReducer} from "./TasksReducer";

test("add task from todolist", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTitle = "NewTitle"

    const startState = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    const endState = TasksReducer(startState, {
        type: "ADD-TASK",
        payload: {
            title: newTitle,
            id: todolistId1
        }
    })

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe(newTitle)
})

test("remove task from todolist", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    const endState = TasksReducer(startState, {
        type: "REMOVE-TASK",
        payload: {
            id: startState[todolistId1][0].id,
            todolistID: todolistId1
        }
    })

    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId1][0].title).toBe("JS")
})

test("change task status from todolist", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    const endState = TasksReducer(startState, {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistID: todolistId1,
            taskID: startState[todolistId1][0].id,
            isDone: startState[todolistId1][0].isDone
        }
    })

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId1][0].isDone).toBe(true)
})


