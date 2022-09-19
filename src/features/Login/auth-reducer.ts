import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, FieldErrorsType, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {Dispatch} from "redux";

type AsyncThunkConfigType = {
    state?: unknown
    dispatch?: Dispatch
    extra?: unknown
    rejectValue?: {
        error?: Array<string>
        fieldsErrors?: Array<FieldErrorsType>
    }
}

export const loginTC = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType, AsyncThunkConfigType>('auth/login', async (data, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            const error = {
                errors: res.data.messages,
                fieldsErrors: res.data.fieldsErrors
            }
            return thunkAPI.rejectWithValue(error)
        }

    } catch (err) {
        // @ts-ignore
        const error: AxiosError = err;
        handleServerNetworkError({message: 'error'}, thunkAPI.dispatch)
        const errorValue = {
            error: [error.message],
            fieldsErrors: undefined
        }
        return thunkAPI.rejectWithValue(errorValue)
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
    } catch (error) {
        handleServerNetworkError({message: 'error'}, thunkAPI.dispatch)
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
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }

})

export const authReducer = slice.reducer;

// get actions
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;

