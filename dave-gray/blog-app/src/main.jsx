import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { fetchUsers } from "./features/users/usersSlice.js";
import { BrowserRouter } from "react-router";
import { fetchPosts } from "./features/posts/postsSlice.js";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
