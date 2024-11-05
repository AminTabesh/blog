import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  id: "",
  username: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action) => {
        state.id = action.payload.id
        state.username = action.payload.name
        state.isAuth = true
    },
    logout: (state) => {
        state.id = ''
        state.username = ''
        state.isAuth = false
    }
  }
});

export const {login, logout} = usersSlice.actions

export default usersSlice.reducer
