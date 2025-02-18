import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const initialState = {
	posts: [],
	status: "idle",
	error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await axios.get(POSTS_URL);
	return [...response.data];
});

export const addNewPost = createAsyncThunk(
	"posts/addNewPost",
	async (initialPost) => {
		const response = await axios.post(POSTS_URL, initialPost);
		return response.data;
	}
);

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPost: {
			reducer: (state, action) => {
				state.posts.push(action.payload);
			},
			prepare: (title, content, userId) => {
				const id = nanoid();
				return {
					payload: {
						id,
						title,
						content,
						date: new Date().toISOString(),
						userId,
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				};
			},
		},
		addReaction: {
			reducer: (state, action) => {
				const { postId, reaction } = action.payload;
				const existingPost = state.posts.find((post) => post.id === postId);
				if (existingPost) {
					existingPost.reactions[reaction]++;
				}
			},
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.status = "succeeded";

			let minute = 1;
			const loadedPosts = action.payload.map((post) => {
				(post.date = sub(new Date(), { minutes: minute++ }).toISOString()),
					(post.reactions = {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0,
					});
				return post;
			});

			state.posts = state.posts.concat(loadedPosts);
		});
		builder.addCase(fetchPosts.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});

		builder.addCase(addNewPost.fulfilled, (state, action) => {
			action.payload.userId = Number(action.payload.userId);
			action.payload.date = new Date().toISOString();
			action.payload.reactions = {
				thumbsUp: 0,
				wow: 0,
				heart: 0,
				rocket: 0,
				coffee: 0,
			};
			state.posts.push(action.payload);
		});
	},
});

export const selectAllPosts = (state) => state.postsR.posts;
export const getPostsStatus = (state) => state.postsR.status;
export const getPostsError = (state) => state.postsR.error;

export const { addPost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
