import React from 'react';
import TodoListHeader from "./TodoListHeader";
import {FilterValuesType, TaskType} from "../../App";
import Task from "./Task";
import {AddItemForm} from "../AddItemForm";
import {ButtonsBlock} from "./ButtonsBlock";

type TodoListPropsType = {
	todoListId: string
	title: string
	tasks: Array<TaskType>
	filter: FilterValuesType
	removeTask: (taskID: string, todoListID: string) => void
	changeFilter: (filter: FilterValuesType, todoListID: string) => void
	addTask: (title: string, todoListID: string) => void
	changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
	changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
	removeTodolist: (todoListID: string) => void
	changeTodolistTitle:(title: string, todoListID: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

	// по нажатию кнопки филбтруем Task
	const setFilterValue = (filter: FilterValuesType) => {
		props.changeFilter(filter, props.todoListId)
	}

	// удаляем TodoList
	const removeTodoList = () => props.removeTodolist(props.todoListId);

	// добавляем new Task
	const addItem = (title: string) => {
		props.addTask(title, props.todoListId)
	};

	// удаляем Task
	const onClickHandlerRemoveTask = (taskID: string) => {
		props.removeTask(taskID, props.todoListId);
	}

	// изменяем статус Task true/false
	const onChangeHandlerTaskStatus = (taskID: string, checked: boolean) => {
		props.changeTaskStatus(taskID, checked, props.todoListId);
	}

	const onChangeHandlerTaskTitle = (taskID: string, title: string) => {
		props.changeTaskTitle(taskID, title, props.todoListId);
	}

	// изменяем Title в TodoLIst
	const changeTitle = (newTitle: string) => {
		props.changeTodolistTitle(newTitle, props.todoListId)
	}


	// Отрисовываем Task
	const tasksComponents = props.tasks.map(t => {
		// как вариант в отличие от "removeTask"
		// const changeTaskStatus = () => props.changeTaskStatus(t.id)
		return (
			<Task
				key={t.id}
				id={t.id}
				title={t.title}
				isDone={t.isDone}
				removeTask={onClickHandlerRemoveTask}
				changeTaskStatus={onChangeHandlerTaskStatus}
				changeTaskTitle={onChangeHandlerTaskTitle}

			/>
		)
	})


	return (
		<div>
			<TodoListHeader
				title={props.title}
				removeTodoList={removeTodoList}
				changeTitle={changeTitle}/>
			<div>
				<AddItemForm addItem={addItem}/>
			</div>
			<ul>
				{tasksComponents}
			</ul>

			<ButtonsBlock
				filter={props.filter}
				setFilterValue={setFilterValue}/>
		</div>
	);
};

export default TodoList;