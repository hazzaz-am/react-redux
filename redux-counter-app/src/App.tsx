import { Counter } from "./features/counter/Counter";
import PostsView from "./features/posts/PostsView";

export const App = () => {
	return (
		<>
			<Counter />
			<PostsView />
		</>
	);
};
