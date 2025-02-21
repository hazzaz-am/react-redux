import { useDispatch, useSelector } from "react-redux";
import {
	fetchPosts,
	getPostsError,
	getPostsStatus,
	selectPostIds,
} from "./postsSlice";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
	const orderPostsIds = useSelector(selectPostIds);
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
		content = orderPostsIds.map((postId) => (
			<PostExcerpt key={postId} postId={postId} />
		));
	} else if (postsStatus === "failed") {
		content = <p>{error}</p>;
	}

	return <section>{content}</section>;
};
export default PostsList;
