import React, {useState} from 'react';
import './App.css';
import TodoList from "./commponents/TodoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./commponents/AddItemForm";
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


const App = () => {
	// BLL:
	// const todoListTitle: string = "What to learn"
	// const [filter, setFilter] = useState<FilterValuesType>("all")

	const todoListID_1 = v1();
	const todoListID_2 = v1();
	const todoListID_3 = v1();

	const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
		{id: todoListID_1, title: "What to learn", filter: 'all'},
		{id: todoListID_2, title: "What to buy", filter: 'all'},
		{id: todoListID_3, title: "What to read", filter: 'all'}
	])

	const [tasks, setTasks] = useState<TaskStateType>({
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

	})

	// console.log(tasks[todoListID_1][0].title);

	// удаляем Todolist
	const removeTodolist = (todoListsID: string) => {
		setTodoLists(todoLists.filter(tl => tl.id !== todoListsID))
		delete tasks[todoListsID]
	}

	// удаляем Task
	const removeTask = (taskID: string, todoListID: string) => {
		setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)});
	}

	// добавляем новые Task
	const addTask = (title: string, todoListID: string) => {
		const newTask: TaskType = {id: v1(), title, isDone: false};
		setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]});
	}

	// изменяем status y Tasks -- true/false
	const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
		setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
	}

	// изменяем title у Tasks
	const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
		setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)})
	}

	// изменяем title y TodoLists
	const changeTodolistTitle = (title: string, todoListID: string) => {
		setTodoLists([...todoLists].map(t => t.id === todoListID ? {...t, title} : t));
	}

	// изменяем значение filter в TodoList на 'all' 'active' 'completed'
	const changeFilter = (filter: FilterValuesType, todoListID: string) => {
		const upDatedTodoList = todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl);
		setTodoLists(upDatedTodoList);
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
		const newTodoListId = v1();
		const newTodoList: TodoListType = {
			id: newTodoListId, title, filter: 'all'
		};

		setTodoLists([...todoLists, newTodoList]);
		setTasks({...tasks, [newTodoListId]: []})
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

export default App;
