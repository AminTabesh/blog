import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    fetchedPosts: (state, actoin) => {
      state.posts = actoin.payload;
    },
  },
});

export const { addPost, fetchedPosts } = postsSlice.actions;

export default postsSlice.reducer;
