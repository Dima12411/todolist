import {v1} from "uuid";
import {TodolistType} from "../App";
import {TodolistsReducer} from "./TodolistsReducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = TodolistsReducer(startState, {
        type: "REMOVE-TODOLIST",
        payload: {
            id: todolistId1
        }
    })

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test("correct todolist should be added", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newID = v1()
    let newTodolistTitle = "newTodolist"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = TodolistsReducer(startState, {
        type: "ADD-TODOLIST",
        payload: {
            id: newID,
            title: newTodolistTitle
        }
    })

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test("correct todolist should be filter", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = TodolistsReducer(startState, {
        type: "CHANGE-FILTER-TODOLIST",
        payload: {
            id: todolistId1,
            filter: startState[0].filter
        }
    })

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("all")
})

test("correct todolist should be changed title", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "NewTodolist"
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = TodolistsReducer(startState, {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id: todolistId1,
            title: newTodolistTitle
        }
    })

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTodolistTitle)
})
