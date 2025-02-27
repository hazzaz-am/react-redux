import "./App.css";
import { useGetProductsQuery } from "./store/api/apiSlice";

function App() {
	const { data } = useGetProductsQuery("");
	console.log(data);

	return (
		<>
			<h2>Hello</h2>
		</>
	);
}

export default App;
