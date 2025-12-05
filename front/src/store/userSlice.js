import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers:  {
    setUser(state, action) {
      state.id = action.payload.userId;
      state.email = action.payload.email;
      state.role = action.payload.role;
    }, removeUser(state) {
      state.id = null;
      state.email = null;
      state.role = null;
    },
  },
});

export const getUserId = (state) => state.user.id;
export const getUserEmail = (state) => state.user.email;
export const getUserRole = (state) => state.user.role;

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
