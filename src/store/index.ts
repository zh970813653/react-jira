import { configureStore } from "@reduxjs/toolkit"
import { projectListSlice } from "./project-list.slice"
import { authSlice } from "./auth.slice"
// import thunk from "redux-thunk"

export const rootReducer = {
    projectList: projectListSlice.reducer,
    auth: authSlice.reducer
}

export const store = configureStore({
    reducer: rootReducer
    // middleware:[thunk]
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState> 