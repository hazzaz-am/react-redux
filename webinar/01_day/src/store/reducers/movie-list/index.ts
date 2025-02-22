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
};

function movieReducer(state = initialState, action: ActionType) {
	console.log(action);
	return state;
}

export default movieReducer;
