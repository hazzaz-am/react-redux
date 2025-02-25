import { createAction, createReducer } from "@reduxjs/toolkit";
import { ListType } from "../../types/types";

type InitialState = {
	movies: ListType[];
	isLoading: boolean;
	error: string;
};

const initialState: InitialState = {
	movies: [],
	isLoading: false,
	error: "",
};

export const updateMovieAction = createAction<ListType[]>("updateMovie");

export const movieReducer = createReducer(initialState, (builder) => {
	builder.addCase(updateMovieAction, (state, action) => {
		state.movies = action.payload!;
	});
});
