/* eslint-disable react/prop-types */

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostExcerpt = ({ post }) => {
	return (
		<article key={post?.id}>
			<h3>{post?.title}</h3>
			<p>{post?.content?.substring(0, 100)}</p>
			<p className="postCredit">
				<PostAuthor userId={post?.userId} />
				<TimeAgo timestamp={post?.date} />
			</p>
			<ReactionButtons post={post} />
		</article>
	);
};
export default PostExcerpt;
