import type { ListType } from "../../../types/types";

type InitialStateType = {
	cart: ListType[];
	movies: ListType[];
};

const initialState: InitialStateType = {
	cart: [],
	movies: [],
};

type ActionType = {
	type: string;
	value: boolean | string | ListType[] | null;
};

function movieReducer(state = initialState, action: ActionType) {
	switch (action.type) {
		case "UPDATE_LOADER": {
			return {
				...state,
				isLoading: action.value,
			};
		}
		case "UPDATE_ERROR": {
			return {
				...state,
				error: action.value,
			};
		}
		case "UPDATE_DATA": {
			return {
				...state,
				movies: action.value,
			};
		}
		default:
			return state;
	}
}

export default movieReducer;
