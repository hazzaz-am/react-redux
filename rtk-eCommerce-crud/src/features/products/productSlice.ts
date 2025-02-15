import { createSlice } from "@reduxjs/toolkit";
import type { InitialStateType } from "./types";

const initialState: InitialStateType = {
	isLoading: false,
	products: [],
	error: null,
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
});

export default productSlice.reducer;
