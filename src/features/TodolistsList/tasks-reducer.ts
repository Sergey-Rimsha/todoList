import {
	TaskPriorities,
	TaskStatuses,
	TaskType,
	todolistsAPI,
	UpdateTaskModelType
} from '../../api/todolists-api'
import {setAppStatusAC} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {AppRootStateType} from "../../app/store";

// types
export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
export type TasksStateType = {
	[key: string]: Array<TaskType>
}

//thunkCreators
export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
	thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
	const res = await todolistsAPI.getTasks(todolistId);
	const tasks = res.data.items;
	thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
	return {tasks, todolistId}
})

export const removeTaskTC = createAsyncThunk('task/removeTask', async (payload: { taskId: string, todolistId: string }, thunkAPI) => {
	const res = await todolistsAPI.deleteTask(payload.todolistId, payload.taskId);
	return payload;
})

export const addTaskTC = createAsyncThunk('task/addTask', async (payload: { title: string, todolistId: string }, thunkAPI) => {
	thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
	try {
		const res = await todolistsAPI.createTask(payload.todolistId, payload.title);
		if (res.data.resultCode === 0) {
			const task = res.data.data.item
			thunkAPI.dispatch(addTaskAC(task))
			thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
		} else {
			handleServerAppError(res.data, thunkAPI.dispatch);
		}
	} catch (error) {
		handleServerNetworkError({message: 'error'}, thunkAPI.dispatch)
	}
})

type UpdateTaskPayloadType = {
	taskId: string,
	model?: UpdateDomainTaskModelType
	todolistId: string
}


export const updateTaskTC = createAsyncThunk<any, UpdateTaskPayloadType, { state: AppRootStateType }>('task/updateTask', async (payload, {
	dispatch,
	getState
}) => {
	const state = getState();
	const task = state.tasks[payload.todolistId].find(t => t.id === payload.taskId)
	if (!task) {
		//throw new Error("task not found in the state");
		console.warn('task not found in the state')
		return
	}

	const apiModel: UpdateTaskModelType = {
		deadline: task.deadline,
		description: task.description,
		priority: task.priority,
		startDate: task.startDate,
		title: task.title,
		status: task.status,
		...payload.model
	}

	try {
		const res = await todolistsAPI.updateTask(payload.todolistId, payload.taskId, apiModel);
		if (res.data.resultCode === 0) {
			const param = {
				taskId: payload.taskId,
				model: payload.model,
				todolistId: payload.todolistId
			}
			dispatch(updateTaskTC(param))
		} else {
			handleServerAppError(res.data, dispatch);
		}
	} catch (error) {
		handleServerNetworkError({message: 'error'}, dispatch);
	}
})


const initialState: TasksStateType = {}

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTaskAC(state, action: PayloadAction<TaskType>) {
			state[action.payload.todoListId].unshift(action.payload);
		},
		updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
			const tasks = state[action.payload.todolistId];
			const index = tasks.findIndex(t => t.id === action.payload.taskId)
			if (index > -1) {
				tasks[index] = {...tasks[index], ...action.payload.model}
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addTodolistAC, (state, action) => {
			state[action.payload.todolist.id] = [];
		})
		builder.addCase(removeTodolistAC, (state, action) => {
			delete state[action.payload.id]
		})
		builder.addCase(setTodolistsAC, (state, action) => {
			action.payload.todolists.forEach(tl => {
				state[tl.id] = []
			})
		})
		builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
			state[action.payload.todolistId] = action.payload.tasks
		})
		builder.addCase(removeTaskTC.fulfilled, (state, action) => {
			const tasks = state[action.payload.todolistId];
			const index = tasks.findIndex(t => t.id === action.payload.taskId)
			if (index > -1) {
				tasks.splice(index, 1);
			}
		})
	}
})

export const tasksReducer = slice.reducer;

// actions
export const {addTaskAC, updateTaskAC} = slice.actions;
