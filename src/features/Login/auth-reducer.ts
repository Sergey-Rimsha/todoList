import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export const loginTC = createAsyncThunk('auth/login', async (data: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: true}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: false}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
    }

})


const slice = createSlice( {
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
           state.isLoggedIn = action.payload.value;
        }
    }
})

export const authReducer = slice.reducer;

// get actions
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;

