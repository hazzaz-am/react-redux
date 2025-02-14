import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
	books: {
		id: string;
		title: string;
		author: string;
		price: number;
		quantity: number;
	}[];
};

const initialState: InitialStateType = {
	books: [
		{
			id: "1",
			title: "The Alchemist",
			author: "Paulo Coelho",
			price: 12.99,
			quantity: 10,
		},
	],
};

const bookSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		createBook: (state, action) => {
			const book = action.payload;
			state.books.unshift(book);
		},
		updateBook: (state, action) => {
			const book = action.payload;
			const updatedBook = state.books.map((item) =>
				item.id === book.id ? { ...item, ...book } : item
			);
			state.books = updatedBook;
		},
		deleteBook: (state, action) => {
			const id = action.payload;
			state.books = state.books.filter((book) => book.id !== id);
		},
	},
});

export const { deleteBook, createBook, updateBook } = bookSlice.actions;

export default bookSlice.reducer;
