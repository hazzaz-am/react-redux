import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
	{
		id: "1",
		title: "Learning Redux Toolkit",
		content: "I've heard good things.",
		date: sub(new Date(), { minutes: 10 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			wow: 0,
			heart: 0,
			rocket: 0,
			coffee: 0,
		},
	},
	{
		id: "2",
		title: "Slices...",
		content: "The more I say slice, the more I want pizza.",
		date: sub(new Date(), { minutes: 5 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			wow: 0,
			heart: 0,
			rocket: 0,
			coffee: 0,
		},
	},
];

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPost: {
			reducer: (state, action) => {
				state.push(action.payload);
			},
			prepare: (title, content, userId) => {
				const id = nanoid();
				return {
					payload: {
						id,
						title,
						content,
						date: new Date().toISOString(),
						userId
					},
				};
			},
		},
	},
});

export const { addPost } = postsSlice.actions;

export const selectAllPosts = (state) => state.postsR;
export default postsSlice.reducer;
