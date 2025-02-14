import { useState } from "react";
import BookList from "./components/books/BookList";
import CreateBook from "./components/books/CreateBook";
import { Book } from "./types/types";

const App = () => {
	const [editableBook, setEditableBook] = useState<Book | null>(null);

	function handleEditBook(book: Book) {
		setEditableBook({ ...book });
		console.log(editableBook);
	}

	function handleCancelBtn() {
		setEditableBook(null);
	}

	return (
		<div className="App">
			<CreateBook
				editableBook={editableBook}
				onHandleCancelBtn={handleCancelBtn}
			/>
			<BookList onHandleEditBook={handleEditBook} />
		</div>
	);
};
export default App;
