import { useDispatch } from "react-redux";
import { removeAllUser } from "../store/slices/userSlice";

export const DeleteAllUser = () => {
	const dispatch = useDispatch();

	function handleRemoveAllUser() {
		dispatch(removeAllUser());
	}

	return <button style={{
		height: '36px',
		padding: '0 16px',
		background: 'black',
		color: 'white',
		cursor: 'pointer',
		border: 'none',
		borderRadius: '4px',
		marginTop: "20px"
	}} onClick={handleRemoveAllUser}>Delete AllUser</button>;
};
