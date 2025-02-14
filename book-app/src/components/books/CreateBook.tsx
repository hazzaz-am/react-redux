import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { createBook, updateBook } from "../../features/book/bookSlice";
import { Book } from "../../types/types";

const INITIAL_STATE = {
	title: "",
	author: "",
	price: 0,
	quantity: 0,
};

type CreateBookProps = {
	editableBook: null | Book;
	onHandleCancelBtn: () => void;
};

const CreateBook = ({ editableBook, onHandleCancelBtn }: CreateBookProps) => {
	const [book, setBook] = useState({ ...INITIAL_STATE });

	const { title, author, price, quantity } = book;

	const dispatch = useAppDispatch();

	function handleBookInput(event: ChangeEvent<HTMLInputElement>) {
		const name = event.target.name;
		const value = event.target.value;

		setBook({
			...book,
			[name]: value,
		});
	}

	function handleSubmittedBook(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!editableBook) {
			const id = crypto.randomUUID();

			const newBook: Book = {
				id,
				...book,
			};

			dispatch(createBook(newBook));
		} else {
			dispatch(updateBook({ ...book }));
      onHandleCancelBtn()
		}
		setBook({ ...INITIAL_STATE });
	}

  function handleCancelUpdate () {
    onHandleCancelBtn()
    setBook({...INITIAL_STATE})
  }

	useEffect(() => {
		if (editableBook) {
			setBook({ ...editableBook });
		}
	}, [editableBook]);

	return (
		<form onSubmit={handleSubmittedBook}>
			<input
				type="text"
				name="title"
				placeholder="Title"
				required
				value={title}
				onChange={handleBookInput}
			/>
			<input
				type="text"
				name="author"
				placeholder="Author"
				required
				value={author}
				onChange={handleBookInput}
			/>
			<input
				type="number"
				name="price"
				placeholder="Price"
				required
				value={price}
				onChange={handleBookInput}
			/>
			<input
				type="number"
				name="quantity"
				placeholder="Quantity"
				required
				value={quantity}
				onChange={handleBookInput}
			/>
			<button type="submit">{editableBook ? "Update Book" : "Add Book"}</button>
			{editableBook && <button onClick={handleCancelUpdate}>Cancel</button>}
		</form>
	);
};
export default CreateBook;
