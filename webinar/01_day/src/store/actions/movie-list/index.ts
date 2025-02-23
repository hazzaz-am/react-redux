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

export const updateData = (value: ListType[]) => {
	return {
		type: "UPDATE_DATA",
		value,
	};
};

export const addToCart = (value: ListType) => {
	return {
		type: "UPDATE_CART",
		value,
	};
};


export const removeFromCart = (value: string) => {
	return {
		type: "REMOVE_FROM_CART",
		value,
	};
}