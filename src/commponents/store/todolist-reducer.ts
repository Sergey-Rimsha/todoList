import {FilterValuesType, TodoListType} from "../../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
	type: "REMOVE-TODOLIST"
	id: string
}
export type AddTodolistAT = {
	type: "ADD-TODOLIST"
	title: string
}

export type ChangeTodoListTitleAT = {
	type: "CHANGE-TODOLIST-TITLE"
	title: string
	id: string

}

export type ChangeFilterAT = {
	type: "CHANGE-TODOLIST-FILTER"
	filter: FilterValuesType
	id: string
}

export type ActionType = RemoveTodoListAT | AddTodolistAT | ChangeTodoListTitleAT | ChangeFilterAT



export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {

	switch (action.type) {

		case "REMOVE-TODOLIST": {
			return todoLists.filter(tl => tl.id !== action.id)
		}

		case "ADD-TODOLIST": {
			const newTodoListId = v1();
			const newTodoList: TodoListType = {
				id: newTodoListId,  title: action.title, filter: 'all'
			};

			return [...todoLists, newTodoList];
		}

		case "CHANGE-TODOLIST-TITLE": {
			return [...todoLists].map(t => t.id === action.id ?
				{...t, title: action.title} : t)
		}

		case "CHANGE-TODOLIST-FILTER": {
			return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
		}

		default:
			return todoLists
	}
};

// actionCreator функция возращает объект action "Стэк вызвова функций"
export const RemoveTodoListAC = (todolistId: string): RemoveTodoListAT => {
	return {
		type: "REMOVE-TODOLIST",
		id: todolistId
	}
};

export const AddTodoListAC = (title: string): AddTodolistAT => {
	return  {
		type: "ADD-TODOLIST",
		title
	}
};

export const ChangeTodoListTitleAC = (title: string, id: string):ChangeTodoListTitleAT => {
	return {
		type: "CHANGE-TODOLIST-TITLE",
		title,
		id
	}
}

export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string):ChangeFilterAT => {
	return {
		type: "CHANGE-TODOLIST-FILTER",
		filter,
		id
	}
}