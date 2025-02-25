import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./reducers/movieReducer";

export const store = configureStore({
	reducer: {
		movies: movieReducer,
	},
	// preloadedState: {
	// 	movies: {
	// 		movies: [],
	// 		isLoading: true,
	// 		error: "Nice try",
	// 	},
	// },
});

export type RootState = ReturnType<typeof store.getState>;
