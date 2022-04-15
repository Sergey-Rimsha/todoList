import React, {useCallback} from 'react';
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

export const TodoList = React.memo((props: TodoListPropsType) => {

	console.log('todolist is called')

	// по нажатию кнопки филбтруем Task
	const setFilterValue = useCallback((filter: FilterValuesType) => {
		props.changeFilter(filter, props.todoListId)
	},[props.changeFilter, props.todoListId]);

	// удаляем TodoList
	const removeTodoList = useCallback(() => {
		props.removeTodolist(props.todoListId)
	},[props.removeTodolist, props.todoListId]);

	// добавляем new Task
	const addItem = useCallback((title: string) => {
		props.addTask(title, props.todoListId)
	},[props.addTask, props.todoListId]);

	// удаляем Task
	const onClickHandlerRemoveTask = useCallback((taskID: string) => {
		props.removeTask(taskID, props.todoListId);
	},[props.removeTask, props.todoListId]);

	// изменяем статус Task true/false
	const onChangeHandlerTaskStatus = useCallback((taskID: string, checked: boolean) => {
		props.changeTaskStatus(taskID, checked, props.todoListId);
	},[props.changeTaskStatus, props.todoListId]);

	const onChangeHandlerTaskTitle = useCallback((taskID: string, title: string) => {
		props.changeTaskTitle(taskID, title, props.todoListId);
	},[props.changeTaskTitle, props.todoListId]);

	// изменяем Title в TodoLIst
	const changeTitle = useCallback((newTitle: string) => {
		props.changeTodolistTitle(newTitle, props.todoListId)
	},[props.changeTodolistTitle, props.todoListId]);


	const getTasksForRender = (tasks: Array<TaskType>) => {
		switch (props.filter) {
			case "active":
				return tasks.filter(t => !t.isDone)
			case "completed":
				return tasks.filter(t => t.isDone)
			default:
				return tasks
		}
	};

	// Отрисовываем Task
	const tasksComponents = getTasksForRender(props.tasks).map(t => {
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
});

export default TodoList;