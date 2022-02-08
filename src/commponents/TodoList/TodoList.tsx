import React from 'react';
import TodoListHeader from "./TodoListHeader";
import {FilterValuesType, TaskType} from "../../App";
import Task from "./Task";
import {AddItemForm} from "../AddItemForm";
import {ButtonsBlock} from "./ButtonsBlock";

type TodoListPropsType = {
	id: string
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

	const tasksComponents = props.tasks.map(t => {
		// как вариант в отличие от "removeTask"
		// const changeTaskStatus = () => props.changeTaskStatus(t.id)
		return (
			<Task
				key={t.id}
				todoListID={props.id}
				id={t.id}
				title={t.title}
				isDone={t.isDone}
				removeTask={props.removeTask}
				changeTaskStatus={props.changeTaskStatus}
				changeTaskTitle={props.changeTaskTitle}

			/>
		)
	})

	const setFilterValue = (filter: FilterValuesType) => {
		props.changeFilter(filter, props.id)
	}

	const removeTodoList = () => props.removeTodolist(props.id);

	const addItem = (title: string) => {
		props.addTask(title, props.id)
	};

	const changeTitle = (newTitle: string) => {
		props.changeTodolistTitle(newTitle, props.id)
	}


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