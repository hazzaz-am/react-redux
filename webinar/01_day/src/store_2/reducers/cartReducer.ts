import { createSlice } from "@reduxjs/toolkit";
import { ListType } from "../../types/types";

type CartType = {
	[key: string]: {
		count: number;
		value: ListType;
	};
};

export type CartStateType = {
	cart: CartType;
	isLoading: boolean;
	error: string;
};

const initialState: CartStateType = {
	cart: {},
	isLoading: false,
	error: "",
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		updateCart: (state, action) => {
			if (typeof action.payload !== "object" || Array.isArray(action.payload)) {
				return state;
			}
			const value = action.payload;
			const key = value["title"];

			if (state.cart[key]) {
				state.cart[key] = {
					...state.cart[key],
					count: state.cart[key].count + 1,
				};
			} else {
				state.cart[key] = { count: 1, value };
			}
			return state;
		},
		removeFromCart: (state, action) => {
			const prevCart = { ...state.cart };
			delete prevCart[action.payload as string];

			state.cart = { ...prevCart };

			return state;
		},
	},
});

export const { updateCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
