import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isLoading: false,
  isCartModalOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers:  {
    setCart: (state, action) => {
      state.list = action.payload;
    },
    setIsCartLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    addProductToCart:  (state, action) =>  {
      const productId = action.payload;
      state.list.push({id: productId, count: 1})
    },

    incrementProductCount: (state, action) => {
      const productId = action.payload;
      const currentProductIdIndex = state.list.findIndex((currentProduct) => currentProduct.id === productId);
      state.list[currentProductIdIndex].count = state.list[currentProductIdIndex].count + 1;
    },

    decrementProductCount: (state, action) => {
      const productId = action.payload;
      const currentProductIdIndex = state.list.findIndex((currentProduct) => currentProduct.id === productId);
      if (state.list[currentProductIdIndex].count === 1)  {
        state.list = state.list.filter((currentProductId) => currentProductId.id !== productId);
        return;
      }
      state.list[currentProductIdIndex].count = state.list[currentProductIdIndex].count - 1;
    },

    setIsCartModalOpen: (state, action) => {
      state.isCartModalOpen = action.payload;
    },

    deleteProductFromCart: (state, action) => {
      state.list = state.list.filter((product) => product.id !== action.payload);
    }
  },
});

export const getCartSelector = (state) => {
  const cartProductsIds = state.cart.list.map((product) => product.id)
  return state.products.list.filter((product) => cartProductsIds.includes(product.id))
};

export const getCartToOrderSelector = (state) => {
  const cart = state.cart.list.map((basketProduct) => {
    const productId = basketProduct.id;
    const product = state.products.list.find((item) => item.id === productId);

    return { ...product, count: basketProduct.count }
  });
  return cart;
}

export const getIsCartLoading = (state) => state.cart.isLoading;
export const getIsProductAddedToCart = (currentProductId) => {
  const selectorFunction = (state) => {
    return state.cart.list.some((product) => product.id === currentProductId)
  };
  return selectorFunction;
};

export const getProductCartCount = (currentProductId) => (state) => {
  const currentProductIdIndex = state.cart.list.findIndex((currentProduct) => currentProduct.id === currentProductId);
  if (currentProductIdIndex === -1) {
    return 0;
  }
  return state.cart.list[currentProductIdIndex].count;
};

export const getIsCartModalOpen = (state) => state.cart.isCartModalOpen;

export const {
  setCart,
  setIsCartLoading,
  addProductToCart,
  decrementProductCount,
  incrementProductCount,
  setIsCartModalOpen,
  deleteProductFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
