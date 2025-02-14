import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { InitialStateType, ProductType } from "./types";
import axios from "axios";

const initialState: InitialStateType = {
	isLoading: false,
	products: [],
	error: null,
};

const BASE_URL = "http://localhost:8000/products";

export const fetchProducts = createAsyncThunk<ProductType[], void>(
	"products/fetchProducts",
	async () => {
		const response = await axios.get(BASE_URL);
		return response.data;
	}
);

export const deleteProductById = createAsyncThunk<ProductType, string>(
	"products/deleteProductById",
	async (id) => {
		const response = await axios.delete(`${BASE_URL}/${id}`);
		return response.data;
	}
);

export const addProduct = createAsyncThunk<ProductType, ProductType>(
	"products/addProduct",
	async (product) => {
		const response = await axios.post(BASE_URL, product);
		return response.data;
	}
);

export const updateProductById = createAsyncThunk<
	ProductType,
	{ id: string; product: ProductType }
>("products/updateProductById", async ({ id, product }) => {
	const response = await axios.put(`${BASE_URL}/${id}`, product);
	return response.data;
});

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			fetchProducts.fulfilled,
			(state, action: PayloadAction<ProductType[]>) => {
				state.isLoading = false;
				state.products = action.payload;
				state.error = null;
			}
		);
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.isLoading = false;
			state.products = [];
			state.error = action.error.message ?? "UnKnown Error";
		});
		builder.addCase(deleteProductById.fulfilled, (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.products = state.products.filter(
				(product) => product.id !== action.payload.id
			);
		});
		builder.addCase(addProduct.fulfilled, (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.products.unshift(action.payload);
		});
		builder.addCase(updateProductById.fulfilled, (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.products = state.products.map((product) =>
				product.id === action.payload.id
					? { ...product, ...action.payload }
					: product
			);
		});
	},
});

export default productSlice.reducer;
