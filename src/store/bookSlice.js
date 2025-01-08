import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import api from "../apiService"; 

export const fetchBook = createAsyncThunk(
  "books/fetchBook", 
  async ({ page, limit, query }, thunkAPI) => { // thunkAPI dùng khi mình muốn cập nhật 1 state trong slide ở createAsyncThunk
      thunkAPI.dispatch(bookSlice.actions.setPage(page))
      const response = await api.get(
          `http://localhost:5000/books?_page=${page}&_limit=${limit}${query ? `&q=${query}` : ''}`
        ); 
      return response.data; 
  });

export const getBookDetails = createAsyncThunk(
  "books/getBookDetails", 
  async (bookId) => { 
      const response = await api.get(
          `http://localhost:5000/books/${bookId}`
        ); 
      return response.data;
  });

  export const fetchFavorites = createAsyncThunk(
    "favorites/fetchFavorites", 
    async () => { 
      const response = await api.get(
        `http://localhost:5000/books/favorites`
      ); 
        return response.data; }); 
        
  export const removeFavorite = createAsyncThunk(
    "favorites/removeFavorite", 
    async (bookId) => { 
      await api.delete(`
      http://localhost:5000/books/favorites/${bookId}`); 
      return bookId; 
    });

        
const bookSlice = createSlice({ 
  name: "books", 
  initialState: {
    bookList: [],
    book: null,
    loading: false,
    status: 'idle',
    error: null,
    page: 1,
    query: "",
    favorites: [],
    errorMessage: "",
    removedBookId: "",
  }, 
  reducers: {
    setPage: {
      reducer: (state, action) => {
        state.page = action.payload;
      },
    },
    setQuery: {
      reducer: (state, action) => { 
      state.query = action.payload; 
      },
    },
    setFavorites: {
      reducer: (state, action) => { 
      state.query = action.payload; 
      },
    },
    setRemovedBookId: (state, action) => { 
      state.removedBookId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.bookList.push(...action.payload);
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.errorMessage = action.error.message;
      })

      .addCase(getBookDetails.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getBookDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.book = action.payload
      })
      .addCase(getBookDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchFavorites.pending, (state) => { 
        state.loading = true; 
      }) 
      .addCase(fetchFavorites.fulfilled, (state, action) => { 
        state.loading = false; 
        state.book = action.payload; 
        state.errorMessage = ""; 
      }) 
      .addCase(fetchFavorites.rejected, (state, action) => { 
        state.loading = false; 
        state.errorMessage = action.error.message; 
      })

      .addCase(removeFavorite.pending, (state) => { 
        state.loading = true; 
      }) 
      .addCase(removeFavorite.fulfilled, (state, action) => { 
        state.loading = false; 
        state.bookList = state.bookList.filter(
          book => book.id !== action.payload
        );  
      }) 
      .addCase(removeFavorite.rejected, (state, action) => { 
        state.loading = false; 
        state.errorMessage = action.error.message; 
    });
  },
}); 
    
export const { setPage, setFavorites, setRemovedBookId, setQuery } = bookSlice.actions;

export default bookSlice.reducer;