import { List } from "./data";
import {
	updateData,
	updateError,
	updateLoader,
} from "../store/actions/movie-list";
import { useDispatch, useSelector } from "react-redux";
import { InitialStateType } from "../store/reducers/movie-list";

function useNetwork() {
	const dispatch = useDispatch();
	const state = useSelector((state: InitialStateType) => state);
	const { isLoading, error, movies } = state;

	function fetch() {
		dispatch(updateLoader(true));
		dispatch(updateError(""));
		dispatch(updateData([]));

		setTimeout(() => {
			try {
				if (!List || List.length === 0) {
					throw new Error("No data available");
				}

				dispatch(updateData(List)); // ✅ Load local List data
			} catch (e) {
				if (e instanceof Error) {
					dispatch(updateError(e.message)); // ✅ Handle error
				}
			} finally {
				dispatch(updateLoader(false)); // ✅ Stop loading
			}
		}, 1000);
	}

	return {
		fetch,
		isLoading,
		error,
		movies,
	};
}

export default useNetwork;
