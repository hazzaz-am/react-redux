import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
	status: "idle",
	error: null,
	counter: 0,
});

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

export const updatePost = createAsyncThunk(
	"/posts/updatePost",
	async (post) => {
		const { id } = post;
		try {
			const response = await axios.put(`${POSTS_URL}/${id}`, post);
			return response.data;
		} catch (err) {
			console.error("Can't Update", err);
			return post;
		}
	}
);

export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
	const { id } = post;
	try {
		const response = await axios.delete(`${POSTS_URL}/${id}`);
		if (response?.status === 200) return post;
		return `${response?.status}: ${response?.statusText}`;
	} catch (error) {
		return error.message;
	}
});

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addReaction: {
			reducer: (state, action) => {
				const { postId, reaction } = action.payload;
				const existingPost = state.entities[postId];
				if (existingPost) {
					existingPost.reactions[reaction]++;
				}
			},
		},
		incrementCounter: (state) => {
			state.counter += 1;
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

			postsAdapter.upsertMany(state, loadedPosts);
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
			postsAdapter.addOne(state, action.payload);
		});
		builder.addCase(updatePost.fulfilled, (state, action) => {
			if (!action.payload.id) {
				console.log("No id found in the response");
				console.log(action.payload);
				return;
			}
			action.payload.date = new Date().toISOString();
			postsAdapter.upsertOne(state, action.payload);
		});
		builder.addCase(deletePost.fulfilled, (state, action) => {
			if (!action.payload?.id) {
				console.log(`Can't Delete`);
				return;
			}
			const { id } = action.payload;
			postsAdapter.removeOne(state, id);
		});
	},
});

export const {
	selectAll: selectAllPosts,
	selectById: selectPosById,
	selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.postsR);

export const getPostsStatus = (state) => state.postsR.status;
export const getPostsError = (state) => state.postsR.error;
export const getCount = (state) => state.postsR.counter;

export const selectPostsByUser = createSelector(
	[selectAllPosts, (state, userId) => userId],
	(posts, userId) => posts.filter((post) => post.userId === userId)
);

export const { incrementCounter, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
