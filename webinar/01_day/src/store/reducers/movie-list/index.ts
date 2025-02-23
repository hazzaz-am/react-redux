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
			return { ...state, isLoading: action.value as boolean }; // ✅ Correct

		case "UPDATE_ERROR":
			return { ...state, error: action.value as string }; // ✅ Correct

		case "UPDATE_DATA":
			return { ...state, movies: action.value as ListType[] }; // ✅ Correct

		default:
			return state;
	}
}


export default movieReducer;
