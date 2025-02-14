import React from "react";
import { deleteBook } from "../../features/book/bookSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Book } from "../../types/types";

type BookListProps = {
	onHandleEditBook: (book: Book) => void;
};

const BookList = ({ onHandleEditBook }: BookListProps) => {
	const books = useAppSelector((state) => state.booksR.books);
	const dispatch = useAppDispatch();

	function handleDeleteBook(id: string) {
		dispatch(deleteBook(id));
	}

	function handleUpdateBook(book: Book) {
		onHandleEditBook(book);
	}

	return (
		<div>
			<h2>List of Books</h2>
			<ul>
				{books.length === 0 ? (
					<p>No Book Exist</p>
				) : (
					books.map((book) => (
						<React.Fragment key={book.id}>
							<li>
								{book.title} by {book.author} - $ {book.price} - {book.quantity}{" "}
								pcs
							</li>
							<button onClick={() => handleDeleteBook(book.id)}>Delete</button>
							<button onClick={() => handleUpdateBook(book)}>Edit</button>
						</React.Fragment>
					))
				)}
			</ul>
		</div>
	);
};
export default BookList;
