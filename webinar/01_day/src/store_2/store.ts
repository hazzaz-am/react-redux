import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./reducers/movieReducer";
import  cartReducer from "./reducers/cartReducer";

export const store = configureStore({
	reducer: {
		movies: movieReducer,
    cart: cartReducer
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
