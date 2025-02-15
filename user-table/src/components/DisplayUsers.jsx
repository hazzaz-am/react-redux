import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import { deleteUser } from "../store/slices/userSlice";

const DisplayUsers = () => {
	const data = useSelector((state) => state.usersR);
	const dispatch = useDispatch()

	function handleDeleteUser(id) {
		dispatch(deleteUser(id))
	}

	return (
		<Wrapper>
			{data.map((user, id) => {
				return (
					<li key={id}>
						{user}
						<button className=" btn-delete" onClick={() => handleDeleteUser(id)}>
							<MdOutlineDelete className="delete-icon" />
						</button>
					</li>
				);
			})}
		</Wrapper>
	);
};

const Wrapper = styled.section`
	li {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		border-bottom: 1px solid #eee;

		&:first-child {
			border-top: 1px solid #eee;
		}
	}

	.btn-delete {
		background-color: transparent;
		border: 0;
		color: #fff;
	}
`;

export default DisplayUsers;
