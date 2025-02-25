import { List } from "./data";
import {
	updateData,
	updateError,
	updateLoader,
} from "../store/actions/movie-list/movieActions";
import { useDispatch, useSelector } from "react-redux";
import { updateMovieAction } from "../store_2/reducers/movieReducer";
import { RootState } from "../store_2/store";

function useNetwork() {
	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => state.movies.movies);
	console.log(state)

	function fetch() {
		dispatch(updateLoader(true));
		dispatch(updateError(""));
		dispatch(updateData([]));

		setTimeout(() => {
			try {
				if (!List || List.length === 0) {
					throw new Error("No data available");
				}

				// dispatch(updateData(List));
				dispatch(updateMovieAction(List));
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
		state,
	};
}

export default useNetwork;
