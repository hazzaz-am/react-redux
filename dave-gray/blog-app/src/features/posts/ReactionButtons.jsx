/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { addReaction } from "./postsSlice";

const reactionEmoji = {
	thumbsUp: "👍",
	wow: "😮",
	heart: "❤️",
	rocket: "🚀",
	coffee: "☕",
};

const ReactionButtons = ({ post }) => {
	const dispatch = useDispatch();

	const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
		<button
			key={name}
			type="button"
			className="reactionButton"
			style={{
				cursor: "pointer",
				marginRight: "30px",
			}}
			onClick={() => dispatch(addReaction({ postId: post.id, reaction: name }))}
		>
			{emoji} {post?.reactions[name]}
		</button>
	));

	return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
