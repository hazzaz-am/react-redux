import { Navigate, Route, Routes } from "react-router";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import Layout from "./components/Layout";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<PostsList />} />

				{/* Routes For Posts */}
				<Route path="post">
					<Route index element={<AddPostForm />} />
					<Route path=":postId" element={<SinglePostPage />} />
					<Route path="edit/:postId" element={<EditPostForm />} />
				</Route>

				{/* Routes For Users */}
				<Route path="user">
					<Route index element={<UsersList />} />
					<Route path=":userId" element={<UserPage />} />
				</Route>

				{/* Routes For Bad Request */}
				<Route path="*" element={<Navigate to={"/"} replace />} />
			</Route>
		</Routes>
	);
};
export default App;
