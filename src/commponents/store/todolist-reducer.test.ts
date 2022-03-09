import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../../App";
import {
	ActionType,
	AddTodoListAC,
	ChangeTodoListFilterAC, ChangeTodoListTitleAC,
	ChangeTodoListTitleAT,
	RemoveTodoListAC,
	todolistsReducer
} from "./todolist-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListType>

beforeEach(() => {

	todolistId1 = v1();
	todolistId2 = v1();

	startState = [
		{id: todolistId1, title: "What to learn", filter: "all"},
		{id: todolistId2, title: "What to buy", filter: "all"}
	]
})


test('correct todolist should be removed', () => {
	// let todolistId1: string = v1();
	// let todolistId2: string = v1();
	//
	// const startState: Array<TodoListType> = [
	// 	{id: todolistId1, title: "What to learn", filter: "all"},
	// 	{id: todolistId2, title: "What to buy", filter: "all"}
	// ]

	const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId1))

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
	todolistId1 = v1();
	todolistId2 = v1();

	let newTodolistTitle = "New Todolist";

	const startState: Array<TodoListType> = [
		{id: todolistId1, title: "What to learn", filter: "all"},
		{id: todolistId2, title: "What to buy", filter: "all"}
	]


	const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle))

	expect(endState.length).toBe(3);
	expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {
	todolistId1 = v1();
	todolistId2 = v1();

	let newTodolistTitle = "New Todolist";

	const startState: Array<TodoListType> = [
		{id: todolistId1, title: "What to learn", filter: "all"},
		{id: todolistId2, title: "What to buy", filter: "all"}
	]


	const endState = todolistsReducer(startState, ChangeTodoListTitleAC(newTodolistTitle, todolistId2));

	expect(endState[0].title).toBe("What to learn");
	expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
	todolistId1 = v1();
	todolistId2 = v1();

	let newFilter: FilterValuesType = "completed";

	const startState: Array<TodoListType> = [
		{id: todolistId1, title: "What to learn", filter: "all"},
		{id: todolistId2, title: "What to buy", filter: "all"}
	]

	const endState = todolistsReducer(startState,  ChangeTodoListFilterAC(newFilter, todolistId2));

	expect(endState[0].filter).toBe("all");
	expect(endState[1].filter).toBe(newFilter);
});