import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface PostsState {
  posts: Post[];
}
export const fetchPosts = createAsyncThunk("post/fetchPosts", async (_, thunkAPI) => {
  try {
    const result = await fetch(`http://localhost:3004/posts`).then((response) => {
      if (response.status !== 200) {
        throw new Error("Fetching failed");
      }
      return response.json();
    });
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue("Fetching failed");
  }
});
export const fetchPostsByUserId = createAsyncThunk(
  "post/fetchPostsByUserId",
  async (userId: number, thunkAPI) => {
    try {
      const result = await fetch(`http://localhost:3004/posts?userId=${userId}`).then(
        (response) => {
          if (response.status !== 200) {
            throw new Error("Fetching failed");
          }
          return response.json();
        }
      );
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue("Fetching failed");
    }
  }
);

const initialState: PostsState = {
  posts: [],
};

export const PostsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log("error", action);
      });

    builder
      .addCase(fetchPostsByUserId.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        console.log("error", action);
      });
  },
});

export default PostsSlice.reducer;
