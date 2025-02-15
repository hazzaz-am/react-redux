import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "users",
	initialState: [],
	reducers: {
		addUser: (state, action) => {
			state.push(action.payload);
		},
		deleteUser: (state, action) => {
			state.splice(action.payload, 1);
		},
		removeAllUser: () => {
			return [];
		},
	},
});

export const { addUser, deleteUser, removeAllUser } = userSlice.actions;
export default userSlice.reducer;
