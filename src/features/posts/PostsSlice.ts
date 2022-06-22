import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [
    {
      userId: 1,
      id: 1,
      title: "1",
      body: "1",
    },
  ],
};

export const PostsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default PostsSlice.reducer;
