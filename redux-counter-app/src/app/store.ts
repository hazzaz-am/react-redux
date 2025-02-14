import counterReducer from "./../features/counter/counterSlice";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postSlice'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		postsR: postsReducer
	},
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store