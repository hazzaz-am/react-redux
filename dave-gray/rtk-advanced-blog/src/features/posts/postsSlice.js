import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => "posts",
			transformResponse: (res) => {
				let min = 1;
				const loadedPosts = res.map((post) => {
					if (!post?.date)
						post.date = sub(new Date(), { minutes: min++ }).toISOString();
					if (post?.reactions)
						post.reactions = {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						};
					return post;
				});
				return postsAdapter.setAll(initialState, loadedPosts);
			},
			providesTags: (result) => [
				{ type: "Post", id: "LIST" },
				...result.ids.map((id) => ({ type: "Post", id })),
			],
		}),
	}),
});

export const { useGetPostsQuery } = extendedApiSlice;

export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
	selectPostsResult,
	(posts) => posts.data
);

export const {
	selectAll: selectAllPosts,
	selectById: selectPosById,
	selectIds: selectPostIds,
} = postsAdapter.getSelectors(
	(state) => selectPostsData(state) ?? initialState
);
