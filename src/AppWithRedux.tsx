import React from 'react';
import './App.css';
import TodoList from "./commponents/TodoList/TodoList";
import {AddItemForm} from "./commponents/AddItemForm";
import {
	AddTodoListAC,
	ChangeTodoListFilterAC,
	ChangeTodoListTitleAC,
	RemoveTodoListAC
} from "./commponents/store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./commponents/store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
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

	// <AppRootStateType, TaskStateType> -- Дженерик => первый приходит тип, второй уходит тип

	const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);

	const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);


	const dispatch = useDispatch()

	// удаляем Task
	const removeTask = (taskID: string, todoListID: string) => {

		dispatch(removeTaskAC(taskID, todoListID));
	}

	// добавляем новые Task
	const addTask = (title: string, todoListID: string) => {
		dispatch(addTaskAC(title, todoListID));
	}

	// изменяем status y Tasks -- true/false
	const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
		dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
	}

	// изменяем title у Tasks
	const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
		dispatch(changeTaskTitleAC(taskID, title, todoListID))
	}



	// удаляем Todolist
	const removeTodolist = (todoListsID: string) => {
		let action = RemoveTodoListAC(todoListsID);
		dispatch(action);
	}

	// изменяем title y TodoLists
	const changeTodolistTitle = (title: string, todoListID: string) => {
		dispatch(ChangeTodoListTitleAC(title, todoListID));
	}

	// изменяем значение filter в TodoList на 'all' 'active' 'completed'
	const changeFilter = (filter: FilterValuesType, todoListID: string) => {
		dispatch(ChangeTodoListFilterAC(filter, todoListID));
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
		dispatch(action);
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
