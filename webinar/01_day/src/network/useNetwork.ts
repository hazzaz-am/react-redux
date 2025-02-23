import axios from "axios";
import { List } from "./data";
import {
	updateData,
	updateError,
	updateLoader,
} from "../store/actions/movie-list";
import { useDispatch } from "react-redux";
import { ListType } from "../types/types";

type FetchTypes = {
	isLoading: boolean;
	error: string;
	data: ListType[] | null;
	fetch: () => void;
};

function useNetwork(): FetchTypes {
	const dispatch = useDispatch();

	function fetch() {
		dispatch(updateLoader(true));
		dispatch(updateError(""));
		dispatch(updateData([]));

		setTimeout(() => {
			axios
				.get("/data.json")
				.then(() => {
					updateData(List);
				})
				.catch((e) => {
					console.log(e);
					dispatch(updateError(e.message));
				})
				.finally(() => {
					dispatch(updateLoader(false));
				});
		}, 1000);
	}

	return {
		isLoading: false,
		error: "",
		data: null,
		fetch,
	};
}

export default useNetwork;
