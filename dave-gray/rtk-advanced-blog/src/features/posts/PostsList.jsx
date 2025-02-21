import { useSelector } from "react-redux";
import { selectPostIds, useGetPostsQuery } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
	const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

	const orderPostsIds = useSelector(selectPostIds);

	let content;

	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		content = orderPostsIds.map((postId) => (
			<PostExcerpt key={postId} postId={postId} />
		));
	} else if (isError) {
		content = <p>{error}</p>;
	}

	return <section>{content}</section>;
};
export default PostsList;
