import { ListType } from "../../../types/types";
import * as actions from "../../constants/cart/cartConstants";

export const addToCart = (value: ListType) => {
	return {
		type: actions.UPDATE_CART,
		value,
	};
};

export const removeFromCart = (value: string) => {
	return {
		type: actions.REMOVE_FROM_CART,
		value,
	};
};
