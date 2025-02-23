import { combineReducers, createStore } from "redux";
import movieReducer from "./reducers/movie-list/movieReducer";
import cartReducer from "./reducers/cart/cartReducer";

const store = createStore(
	combineReducers({
		movie: movieReducer,
		cart: cartReducer,
	})
);
export type RootState = ReturnType<typeof store.getState>;

export default store;
