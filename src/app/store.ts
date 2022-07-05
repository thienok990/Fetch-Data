import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { postApi } from "../services/post";
import { commentApi } from "../services/comment";
import counterReducer from "../features/counter/counterSlice";
import postReducer from "../features/posts/PostsSlice";
import commentReducer from "../features/comments/CommentsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer,
    comment: commentReducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([postApi.middleware, commentApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
