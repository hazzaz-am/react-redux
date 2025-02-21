/* eslint-disable react/prop-types */

import { useAddReactionMutation } from "./postsSlice";

const reactionEmoji = {
	thumbsUp: "👍",
	wow: "😮",
	heart: "❤️",
	rocket: "🚀",
	coffee: "☕",
};

const ReactionButtons = ({ post }) => {
	const [addReaction] = useAddReactionMutation();

	const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
		<button
			key={name}
			type="button"
			className="reactionButton"
			style={{
				cursor: "pointer",
				marginRight: "30px",
			}}
			onClick={() => {
				const newValue = (post.reactions?.[name] || 0) + 1;
				addReaction({
					postId: post.id,
					reactions: { ...post.reactions, [name]: newValue },
				});
			}}
		>
			{emoji}
			{post.reactions?.[name] || 0}
		</button>
	));

	return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
