/* eslint-disable react/prop-types */

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectPosById } from "./postsSlice";

const PostExcerpt = ({ postId }) => {
	const post = useSelector((state) => selectPosById(state, postId));
	
	return (
		<article key={post?.id}>
			<h3>{post?.title}</h3>
			<p className="excerpt">{post?.body?.substring(0, 75)}...</p>
			<p className="postCredit">
				<Link to={`/post/${post?.id}`}>View Post</Link>
				<PostAuthor userId={post?.userId} />
				<TimeAgo timestamp={post?.date} />
			</p>
			<ReactionButtons post={post} />
		</article>
	);
};
export default PostExcerpt;
