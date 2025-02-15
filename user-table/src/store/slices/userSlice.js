import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "users",
	initialState: [],
	reducers: {
		addUser: (state, action) => {
			state.push(action.payload);
		},
		deleteUser: (state, action) => {},
		removeAllUser: (state, action) => {},
	},
});

export const { addUser, deleteUser, removeAllUser } = userSlice.actions;
export default userSlice.reducer;
