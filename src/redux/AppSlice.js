const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  users: [], //users array
  products: [], //products array
  searchedArray: [], //search products array
  error: "",
  loading: "block",
};
// method to fetch products through API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    const element = await response.json();
    return element;
  }
);
// slice
export const AppSlice = createSlice({
  name: "eCommerceApp",
  initialState,
  reducers: {
    // to add user to session storage
    addUser: (state, action) => {
      state.users.push(action.payload);
      sessionStorage.setItem("user", JSON.stringify(state.users));
    },
    // to delete user to session storage
    deleteUser: (state, action) => {
      const newList = state.users.filter((item) => item.id !== action.payload);
      state.users = newList;
      sessionStorage.setItem("user", JSON.stringify(state.users));
    },
    // to search products
    handleSearch: (state, action) => {
      state.searchedArray.push(action.payload);
    },
    // clear search
    deleteSearch: (state, action) => {
      state.searchedArray = [];
    },
  },
  extraReducers: (builder) => {
    /*--------Fetch Products-------*/
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = "block";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = "none";
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = "none";
      state.products = [];
      state.error = action.error.message;
    });
  },
});
export const { addUser, deleteUser, handleSearch, deleteSearch } =
  AppSlice.actions;
export default AppSlice.reducer;
