import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { commentApi } from "../../services/comment";

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
export interface CommentsState {
  comments: Comment[];
  selectedComment: Comment | null;
}

export const fetchComments = createAsyncThunk("comment/fetchComments", async (_, thunkAPI) => {
  try {
    const result = await fetch(`http://localhost:3004/comments`).then((response) => {
      if (response.status !== 200) {
        throw new Error("Fetching Failed");
      }
      return response.json();
    });
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue("Fetching Failed");
  }
});

export const fetchCommentsByPostId = createAsyncThunk(
  "comment/fetchComments",
  async (postId: number, thunkAPI) => {
    try {
      const result = await fetch(`http://localhost:3004/comments?postId=${postId}`).then(
        (response) => {
          if (response.status !== 200) {
            throw new Error("Fetching Failed");
          }
          return response.json();
        }
      );
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue("Fetching Failed");
    }
  }
);

const initialState: CommentsState = {
  comments: [],
  selectedComment: null,
};

export const CommentsSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    selectComment: (state, action: PayloadAction<Comment>) => {
      state.selectedComment = action.payload;
    },
    changeSelectedCommentName: (state, action: PayloadAction<string>) => {
      if (state.selectedComment != null) {
        state.selectedComment.name = action.payload;
      }
    },
    changeSelectedCommentEmail: (state, action: PayloadAction<string>) => {
      if (state.selectedComment != null) {
        state.selectedComment.email = action.payload;
      }
    },
    changeSelectedCommentBody: (state, action: PayloadAction<string>) => {
      if (state.selectedComment != null) {
        state.selectedComment.body = action.payload;
      }
    },
    changeSelectedCommentPostId: (state, action: PayloadAction<number>) => {
      if (state.selectedComment != null) {
        state.selectedComment.postId = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(commentApi.endpoints.getComments.matchFulfilled, (state, action) => {
        state.comments = action.payload.comments;
      })
      .addMatcher(commentApi.endpoints.getComments.matchRejected, (state, action) => {
        // Handle Error
      });
  },
});

export const {
  setComments,
  selectComment,
  changeSelectedCommentName,
  changeSelectedCommentEmail,
  changeSelectedCommentBody,
  changeSelectedCommentPostId,
} = CommentsSlice.actions;

export default CommentsSlice.reducer;
