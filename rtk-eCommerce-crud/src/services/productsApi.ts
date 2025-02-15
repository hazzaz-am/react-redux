import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "../features/products/types";

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000/",
	}),
	tagTypes: ["Products"],
	endpoints: (builder) => ({
		getProducts: builder.query<ProductType[], void>({
			query: () => "products",
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Products", id } as const)),
							{
								type: "Products",
								id: "LIST",
							},
					  ]
					: [{ type: "Products", id: "LIST" }],
		}),
		deleteProduct: builder.mutation<void, string>({
			query: (id) => ({
				url: `/products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (_result, _error, id) => [{ type: "Products", id }],
		}),
		addProduct: builder.mutation<ProductType, ProductType>({
			query: (body) => ({
				url: `/products`,
				method: "POST",
				body,
			}),
			invalidatesTags: [{ type: "Products", id: "LIST" }],
		}),
		updateProduct: builder.mutation<
			ProductType,
			{ id: string; updatedProduct: ProductType }
		>({
			query: ({ id, updatedProduct }) => ({
				url: `/products/${id}`,
				method: "PUT",
				body: updatedProduct,
			}),
			invalidatesTags: (_result, _error, { id }) => [{ type: "Products", id }],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useDeleteProductMutation,
	useAddProductMutation,
	useUpdateProductMutation,
} = productsApi;
