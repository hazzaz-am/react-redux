/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { Link } from "react-router";

const PostAuthor = ({ userId }) => {
	const users = useSelector(selectAllUsers);

	const author = users?.find((user) => user.id === userId);

	return (
		<span>
			{author ? (
				<Link to={`/user/${userId}`}>{author.name}</Link>
			) : (
				"Unknown User"
			)}
		</span>
	);
};
export default PostAuthor;
