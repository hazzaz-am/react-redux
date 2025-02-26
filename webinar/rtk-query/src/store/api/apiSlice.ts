import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://dummyjson.com/products",
	}),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => "/",
		}),
	}),
});

export const { useGetProductsQuery } = apiSlice;
export default apiSlice;
