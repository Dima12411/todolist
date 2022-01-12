import {v1} from "uuid";
import {TodolistType} from "../App";
import {addTodolistAC, changeFilterAC, removeTodolistAC, TodolistsReducer} from "./TodolistsReducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]
})

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const endState = TodolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test("correct todolist should be added", () => {


    let newID = v1()
    let newTodolistTitle = "newTodolist"

    const endState = TodolistsReducer(startState, addTodolistAC(newTodolistTitle, newID))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test("correct todolist should be filter", () => {

    const endState = TodolistsReducer(startState, changeFilterAC(startState[0].filter, todolistId1))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("all")
})

test("correct todolist should be changed title", () => {

    let newTodolistTitle = "NewTodolist"

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
