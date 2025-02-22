import axios from "axios";
import { useState } from "react";
import { List } from "./data";
import { ListType } from "../types/types";

// import {
// 	updateData,
// 	updateError,
// 	updateLoader,
// } from "../store/actions/movie-list";

// import { List } from "./data";

function useNetwork() {
	// const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [data, setData] = useState<ListType[] | null>(null);

	function fetch() {
		// dispatch(updateLoader(true));
		// dispatch(updateError(""));
		// dispatch(updateData([]));

		setIsLoading(true);
		setError("");
		setData(null);

		// setTimeout(() => {
		axios
			.get("/data.json")
			.then((data) => {
				//console.log(List);
				setData(List);
				console.log(data);
				// dispatch(updateData(List));
				// setTimeout(() => {
				//   dispatch(updateData([]));
				// }, 100);
			})
			.catch((e) => {
				console.log(e);
				// dispatch(updateError("Error occu  rred while  fetching data"));
				//  console.log("Error occurred whil e fetching data", e?.response);
				setError(e?.response);
			})
			.finally(() => {
				// dispatch(updateLoader(false));
				setIsLoading(false);
			});
		// }, 1000);
	}

	return { fetch };
}

export default useNetwork;
