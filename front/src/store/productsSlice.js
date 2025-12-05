import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isLoading: false,
  total: 0,
}

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers:  {
    setProducts(state, action)  {
      state.list = action.payload;
    },
    setIsProductsLoading(state, action)  {
      state.isLoading = action.payload;
    },
    setProductsTotal(state, action)  {
      state.total = action.payload;
    }
  }
});

export const getProductsList = (state) => state.products.list;
export const getProductsTotal = (state) => state.products.total;
export const getIsProductsLoading = (state) => state.products.isLoading;

export const { setProducts, setIsProductsLoading, setProductsTotal } = productsSlice.actions;

export default productsSlice.reducer;