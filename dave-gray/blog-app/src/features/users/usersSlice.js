import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{ id: "0", name: "Dude Lebowski" },
	{ id: "1", name: "Dude" },
	{ id: "2", name: "Lebowski" },
];

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
});

export const selectAllUsers = (state) => state.usersR;

export default usersSlice.reducer;
