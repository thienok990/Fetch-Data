import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../../services/post";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
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
  selectedPost: null,
};

export const PostsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    changeSelectedPostTitle: (state, action) => {
      if (state.selectedPost != null) {
        state.selectedPost.title = action.payload;
      }
    },
    changeSelectedPostBody: (state, action) => {
      if (state.selectedPost != null) {
        state.selectedPost.body = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(postApi.endpoints.getPosts.matchFulfilled, (state, action) => {
        state.posts = action.payload.posts;
      })
      .addMatcher(postApi.endpoints.getPosts.matchRejected, (state, action) => {
        // Handle Error
      });
  },
});

export const { setPosts, selectPost, changeSelectedPostTitle, changeSelectedPostBody } =
  PostsSlice.actions;

export default PostsSlice.reducer;
