import { ListType } from "../../../types/types";

import * as actions from "../../constants/movie-list/movieConstants";

export const updateLoader = (value: boolean) => {
	return {
		type: actions.UPDATE_LOADER,
		value,
	};
};

export const updateError = (value: string) => {
	return {
		type: actions.UPDATE_ERROR,
		value,
	};
};

export const updateData = (value: ListType[]) => {
	return {
		type: actions.UPDATE_DATA,
		value,
	};
};

