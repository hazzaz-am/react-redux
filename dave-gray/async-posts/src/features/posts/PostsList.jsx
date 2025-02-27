import { useDispatch, useSelector } from "react-redux";
import {
	fetchPosts,
	getPostsError,
	getPostsStatus,
	selectAllPosts,
} from "./postsSlice";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
	const posts = useSelector(selectAllPosts);
	const postsStatus = useSelector(getPostsStatus);
	const error = useSelector(getPostsError);

	const dispatch = useDispatch();

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [dispatch, postsStatus]);

	let content;

	if (postsStatus === "loading") {
		content = <p>Loading...</p>;
	} else if (postsStatus === "succeeded") {
		const orderPosts = posts
			.slice()
			.sort((a, b) => b.date.localeCompare(a.date));
		content = orderPosts.map((post) => (
			<PostExcerpt key={post.id} post={post} />
		));
	} else if (postsStatus === "failed") {
		content = <p>{error}</p>;
	}

	return (
		<section>
			<h2>Posts</h2>
			{content}
		</section>
	);
};
export default PostsList;
