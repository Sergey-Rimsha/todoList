import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type StateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: StateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status;
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error;
        },
        setAppInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized;
        }
    }
})

export const appReducer = slice.reducer;

//action creators
export const setAppErrorAC = slice.actions.setAppErrorAC;
export const setAppStatusAC = slice.actions.setAppStatusAC;
export const setAppInitializedAC = slice.actions.setAppInitializedAC;

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {

        }
        dispatch(setAppInitializedAC({isInitialized: true}));
    })
}
