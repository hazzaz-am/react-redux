import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000/",
	}),
	tagTypes: ["Todos"],
	endpoints: (builder) => ({
		getTodos: builder.query({
			query: () => "todos",
			transformResponse: (res) =>
				Array.isArray(res) ? [...res].sort((a, b) => b.id - a.id) : [],
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Todos", id })),
							{ type: "Todos", id: "LIST" },
					  ]
					: [{ type: "Todos", id: "LIST" }],
		}),
		addTodo: builder.mutation({
			query: (todo) => ({
				url: "todos",
				method: "POST",
				body: todo,
			}),
			invalidatesTags: [{ type: "Todos", id: "LIST" }],
		}),
		updateTodo: builder.mutation({
			query: (todo) => ({
				url: `todos/${todo.id}`,
				method: "PATCH",
				body: todo,
			}),
			invalidatesTags: [{ type: "Todos", id: "LIST" }],
		}),
		deleteTodo: builder.mutation({
			query: (id) => ({
				url: `todos/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Todos", id: "LIST" }],
		}),
	}),
});

export const {
	useGetTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = apiSlice;
