import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type PostType = {
	id: number;
	title: string;
	body: string;
};

type InitialStateType = {
	isLoading: boolean;
	posts: PostType[];
	error: null | string;
};

const initialState: InitialStateType = {
	isLoading: false,
	posts: [],
	error: null,
};

export const fetchPosts = createAsyncThunk<PostType[], void>(
	"posts/fetchPosts",
	async () => {
		const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
		return res.data;
	}
);

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			fetchPosts.fulfilled,
			(state, action: PayloadAction<PostType[]>) => {
				state.isLoading = false;
				state.posts = action.payload;
				state.error = null;
			}
		);
		builder.addCase(fetchPosts.rejected, (state, action) => {
			state.isLoading = false;
			state.posts = [];
			state.error = action.error.message ?? "An unknown error occurred";
		});
	},
});

export default postSlice.reducer;
