import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");

	const dispatch = useDispatch();
	const users = useSelector(selectAllUsers);

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onContentChanged = (e) => setContent(e.target.value);
	const onAuthorChanged = (e) => setUserId(e.target.value);

	function onSavePostClicked() {
		if (title && content) {
			dispatch(addPost(title, content, userId));
		}
	}

	const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

	const usersOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

	return (
		<section>
			<h2
				style={{
					marginBottom: "20px",
				}}
			>
				Add a New Post
			</h2>
			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={onTitleChanged}
				/>
				<label htmlFor="postAuthor">Author:</label>
				<select id="postAuthor" value={userId} onChange={onAuthorChanged}>
					<option value="Select Author">Select Author</option>
					{usersOptions}
				</select>
				<label htmlFor="postContent">Content:</label>
				<textarea
					id="postContent"
					name="postContent"
					value={content}
					onChange={onContentChanged}
				/>
				<button onClick={onSavePostClicked} type="button" disabled={!canSave}>
					Save Post
				</button>
			</form>
		</section>
	);
};
export default AddPostForm;
