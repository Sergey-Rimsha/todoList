import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./commponents/TodoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./commponents/AddItemForm";
import {
	AddTodoListAC,
	ChangeTodoListFilterAC,
	ChangeTodoListTitleAC,
	RemoveTodoListAC,
	todolistsReducer
} from "./commponents/store/todolist-reducer";
import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	tasksReducer
} from "./commponents/store/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./commponents/store/store";
// C
// R
// U
// D
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TaskStateType = {
	[todoListID: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"


const AppWithReducers = () => {
	// BLL:
	// const todoListTitle: string = "What to learn"
	// const [filter, setFilter] = useState<FilterValuesType>("all")

	const todoListID_1 = v1();
	const todoListID_2 = v1();
	const todoListID_3 = v1();


	const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
		{id: todoListID_1, title: "What to learn", filter: 'all'},
		{id: todoListID_2, title: "What to buy", filter: 'all'},
		{id: todoListID_3, title: "What to read", filter: 'all'}
	]);

	const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
		[todoListID_1]: [
			{id: v1(), title: "HTML&CSS", isDone: true},
			{id: v1(), title: "JS/ES6", isDone: true},
			{id: v1(), title: "REACT", isDone: true},
		],
		[todoListID_2]: [
			{id: v1(), title: "Redux", isDone: false},
			{id: v1(), title: "Axios", isDone: true},
			{id: v1(), title: "React-redux", isDone: false},
			{id: v1(), title: "Formik", isDone: false},
		],
		[todoListID_3]: [
			{id: v1(), title: "Learn JS", isDone: true},
			{id: v1(), title: "JS", isDone: false},
			{id: v1(), title: "REACT", isDone: true},
		],

	});


	// удаляем Task
	const removeTask = (taskID: string, todoListID: string) => {
		dispatchToTasks(removeTaskAC(taskID, todoListID));
	}

	// добавляем новые Task
	const addTask = (title: string, todoListID: string) => {
		dispatchToTasks(addTaskAC(title, todoListID));
	}

	// изменяем status y Tasks -- true/false
	const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
		dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
	}

	// изменяем title у Tasks
	const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
		dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
	}



	// удаляем Todolist
	const removeTodolist = (todoListsID: string) => {
		let action = RemoveTodoListAC(todoListsID);
		dispatchToTodoLists(action);
		dispatchToTasks(action);
	}

	// изменяем title y TodoLists
	const changeTodolistTitle = (title: string, todoListID: string) => {
		dispatchToTodoLists(ChangeTodoListTitleAC(title, todoListID));
	}

	// изменяем значение filter в TodoList на 'all' 'active' 'completed'
	const changeFilter = (filter: FilterValuesType, todoListID: string) => {
		dispatchToTodoLists(ChangeTodoListFilterAC(filter, todoListID));
	}

	// отображаем Task в Todolist в зависимости от установленного filter - 'all' 'active' 'completed'
	const getTasksForRender = (todolist: TodoListType) => {
		switch (todolist.filter) {
			case "active":
				return tasks[todolist.id].filter(t => !t.isDone)
			case "completed":
				return tasks[todolist.id].filter(t => t.isDone)
			default:
				return tasks[todolist.id]
		}
	}

	// создаём новый TodoList
	const addTodoLists = (title: string) => {
		let action = AddTodoListAC(title);
		dispatchToTodoLists(action);
		dispatchToTasks(action);
	}


	// Отрисовываем все TodoLists --
	const todoListsComponents = todoLists.map(tl => {
		const tasksForRender = getTasksForRender(tl);
		return (
			<TodoList
				key={tl.id}
				todoListId={tl.id}
				title={tl.title}
				tasks={tasksForRender}
				filter={tl.filter}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
				changeTaskStatus={changeTaskStatus}
				removeTodolist={removeTodolist}
				changeTaskTitle={changeTaskTitle}
				changeTodolistTitle={changeTodolistTitle}
			/>
		)

	})

	// UI:
	return (
		<div className="App">
			<AddItemForm addItem={addTodoLists}/>
			{todoListsComponents}
		</div>
	);
}

export default AppWithReducers;
