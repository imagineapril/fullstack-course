import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrdersByUserId } from "../api/orders";

export const getOrdersRequest = createAsyncThunk('getOrdersRequest', async (payload) => {
  const response = await getOrdersByUserId(payload);
  return response.data;

  // const response = await getOrdersByUserId(`/orders/${payload}`);
  // return response.json();
});

const initialState = {
  list: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setOrdersList: (state, { payload }) => {
      state.list = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getOrdersRequest.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getOrdersRequest.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    });

    builder.addCase(getOrdersRequest.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const getOrdersListSelector = (state) => state.orders.list;
export const getOrdersIsLoading = (state) => state.orders.isLoading;

export const { setIsLoading, setOrdersList} = ordersSlice.actions;
export default ordersSlice.reducer;
