import type { ListType } from "../../../types/types";

export type InitialStateType = {
	cart: ListType[];
	movies: ListType[];
	isLoading: boolean;
	error: string;
};

const initialState: InitialStateType = {
	cart: [],
	movies: [],
	isLoading: false,
	error: "",
};

type ActionType = {
	type: string;
	value: boolean | string | ListType[];
};

function movieReducer(state = initialState, action: ActionType) {
	switch (action.type) {
		case "UPDATE_LOADER":
			return { ...state, isLoading: action.value as boolean };

		case "UPDATE_ERROR":
			return { ...state, error: action.value as string };

		case "UPDATE_DATA":
			return { ...state, movies: action.value as ListType[] };

		case "UPDATE_CART": {
			if (typeof action.value !== "object" || Array.isArray(action.value)) {
				return state;
			}
			return {
				...state,
				cart: [...state.cart, action.value],
			};
		}

		default:
			return state;
	}
}

export default movieReducer;
