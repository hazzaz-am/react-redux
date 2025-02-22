import { ListType } from "../../../types/types";

export const updateLoader = (value: boolean) => {
	return {
		type: "UPDATE_LOADER",
		value,
	};
};

export const updateError = (value: string) => {
	return {
		type: "UPDATE_ERROR",
		value,
	};
};

export const updateData = (value: Partial<ListType>) => {
	return {
		type: "UPDATE_DATA",
		value,
	};
};
