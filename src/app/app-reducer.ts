import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

// thunk
export const initializeAppTC = createAsyncThunk('app/initializeApp', async (arg, {dispatch}) => {
   try {
       const res = await authAPI.me()
       if (res.data.resultCode === 0) {
           dispatch(setIsLoggedInAC({value: true}));
       } else {

       }
   } catch (error) {

   }
})

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status;
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error;
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true;
        })
    }


})

export const appReducer = slice.reducer;

//action creators
export const {setAppErrorAC, setAppStatusAC} = slice.actions

