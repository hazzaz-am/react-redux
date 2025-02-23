import type { ListType } from "../../../types/types";

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

type ActionType = {
	type: string;
	value: boolean | string | ListType[];
};

function cartReducer(state = initialState, action: ActionType) {
	switch (action.type) {
		case "UPDATE_CART": {
			if (typeof action.value !== "object" || Array.isArray(action.value)) {
				return state;
			}
			const value = action.value;
			const prevState = { ...state };
			const key = value["title"];

			if (prevState.cart[key]) {
				prevState.cart[key] = {
					...prevState.cart[key], // Preserve existing data
					count: prevState.cart[key].count + 1, // Increment count
				};
			} else {
				prevState.cart[key] = { count: 1, value };
			}
			return prevState;
		}

		case "REMOVE_FROM_CART": {
			const prevState = { ...state };
			const prevCart = { ...prevState.cart };
			delete prevCart[action.value as string];

			prevState.cart = { ...prevCart };

			return prevState;
		}

		default:
			return state;
	}
}

export default cartReducer;
