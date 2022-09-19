import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
	entityStatus: RequestStatusType
}

// thunks
export const fetchTodolistsTC = createAsyncThunk('todolist/featchTodolists', async (arg, thunkAPI) => {
	thunkAPI.dispatch(setAppStatusAC({status: "loading"}));
	try {
		const res = await todolistsAPI.getTodolists();
		thunkAPI.dispatch(setTodolistsAC({todolists: res.data}))
		thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
	} catch (error) {
		handleServerNetworkError({message: 'error'}, thunkAPI.dispatch);
	}
})

export const removeTodolistTC = createAsyncThunk('todolist/removeTodolist', async (todolistId: string, thunkAPI) => {
	//изменим глобальный статус приложения, чтобы вверху полоса побежала
	thunkAPI.dispatch(setAppStatusAC({status: "loading"}));

	//изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
	thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
	try {
		const res = await todolistsAPI.deleteTodolist(todolistId)
		thunkAPI.dispatch(removeTodolistAC({id: todolistId}))
		//скажем глобально приложению, что асинхронная операция завершена
		thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
	} catch (error) {
		handleServerNetworkError({message: 'error'}, thunkAPI.dispatch);
	}
})

export const addTodolistTC = createAsyncThunk('todolist/addTodolist', async (title: string, thunkAPI) => {
	thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
	try {
		const res = await todolistsAPI.createTodolist(title);
		thunkAPI.dispatch(addTodolistAC({todolist: res.data.data.item}))
		thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
	} catch (e) {
		handleServerNetworkError({message: 'error'}, thunkAPI.dispatch);
	}

})

export const changeTodolistTitleTC = createAsyncThunk('todolist/changeTodolistTitle', async (param: {id: string, title: string}, thunkAPI) => {
	try {
		const res = await todolistsAPI.updateTodolist(param.id, param.title);
		thunkAPI.dispatch(changeTodolistTitleAC(param))
	} catch (e) {
		console.log(e);
	}
})


const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
	name: 'todoList',
	initialState: initialState,
	reducers: {
		removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id);
			if (index > -1) {
				state.splice(index, 1);
			}
		},
		addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
			state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
		},
		changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id);
			state[index].title = action.payload.title;
		},
		changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id);
			state[index].filter = action.payload.filter;
		},
		changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id);
			state[index].entityStatus = action.payload.status;
		},
		setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
			return action.payload.todolists.map((tl => ({...tl, filter: 'all', entityStatus: 'idle'})))
		}

	}
})

export const todolistsReducer = slice.reducer;

// actions
export const {
	removeTodolistAC,
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	changeTodolistEntityStatusAC,
	setTodolistsAC
} = slice.actions;





