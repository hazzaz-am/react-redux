import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddNewPostMutation } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router";

const AddPostForm = () => {
	const navigate = useNavigate();

	const [addNewPost, { isLoading }] = useAddNewPostMutation();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");

	const users = useSelector(selectAllUsers);

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onContentChanged = (e) => setContent(e.target.value);
	const onAuthorChanged = (e) => setUserId(e.target.value);

	const canSave = [title, content, userId].every(Boolean) && !isLoading;

	async function onSavePostClicked() {
		if (canSave) {
			try {
				await addNewPost({ title, body: content, userId }).unwrap();
			} catch (error) {
				console.error("Failed to save the post", error);
			} finally {
				setTitle("");
				setContent("");
				setUserId("");
				navigate("/");
			}
		}
	}

	const usersOptions = users?.map((user) => (
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
