import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    ids: [],
    books: {},
  },
  reducers: {
    getBooks(state, action) {
      const { books } = action.payload;

      state.ids = books.map((book) => book.id);

      state.books = books.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.id]: {
            title: cur.title,
            pages: cur.pages.map((page) => page.id),
          },
        };
      }, {});
    },

    addBook(state, action) {
      const { book } = action.payload;

      state.ids.push(book.id);
      state.books[book.id] = { title: book.title, pages: book.pages };
    },

    editBook(state, action) {
      const { book } = action.payload;

      state.books[book.id] = {
        ...state.books[book.id],
        title: book.title,
        pages: book.pages,
      };
    },

    deleteBook(state, action) {
      const { id } = action.payload;

      delete state.books[id];
    },
  },
});

export const { getBooks, addBook, editBook, deleteBook } = bookSlice.actions;

export const fetchBooks = (userId) => (dispatch) => {
  // fetch call for books
};

export default bookSlice.reducer;
