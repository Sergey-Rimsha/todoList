import {TaskStateType, TaskType} from "../../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodoListAT} from "./todolist-reducer";


// export type ActionType = RemoveActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

export type ActionType = ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof changeTaskStatusAC>
	| ReturnType<typeof changeTaskTitleAC>
	| AddTodolistAT
	| RemoveTodoListAT



export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {

	switch (action.type) {
		case "REMOVE-TASK":
			return  {
				...state,
				[action.todoListId]:
					state[action.todoListId].filter(task => task.id !== action.taskId)
			}
		case "ADD-TASK":
			const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
			return {
				...state,
				[action.todoListId]: [newTask, ...state[action.todoListId]],
			}
		case "CHANGE-TASK-STATUS":
			return {
				...state,
				[action.todoListId]:
					state[action.todoListId]
					.map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
			}
		case "CHANGE-TASK-TITLE":
			return {
				...state,
				[action.todoListId]:
					state[action.todoListId]
					.map(task => task.id === action.taskId ? {...task, title: action.title} : task)
			}
		case 'ADD-TODOLIST': {
			return {
				...state,
				[action.todolistId]: []
			}
		}
		case 'REMOVE-TODOLIST': {
			let newState = {...state};
			delete newState[action.id]
			return newState
		}

		default:
			return state
	}
};

// actionCreator функция возращает объект action "Стэк вызвова функций"
export const removeTaskAC = (taskId: string, todoListId: string) => {
	return {
		type: "REMOVE-TASK",
		taskId,
		todoListId
	} as const
};

export const addTaskAC = (title: string, todoListId: string) => {
	return {
		type: "ADD-TASK",
		title,
		todoListId
	} as const
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => {
	return {
		type: "CHANGE-TASK-STATUS",
		taskId,
		isDone,
		todoListId
	} as const
};

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
	return {
		type: "CHANGE-TASK-TITLE",
		taskId,
		title,
		todoListId
	} as const
};
