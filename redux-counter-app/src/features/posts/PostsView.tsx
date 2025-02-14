import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts } from "./postSlice";

const PostsView = () => {
	const { error, isLoading, posts } = useAppSelector((state) => state.postsR);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading.....</div>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<h4>{post.title}</h4>
						<p>{post.body}</p>
					</li>
				))}
			</ul>
		</div>
	);
};
export default PostsView;
