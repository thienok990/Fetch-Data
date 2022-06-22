import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { postApi } from "../services/post";

import counterReducer from "../features/counter/counterSlice";
import postReducer from "../features/posts/PostsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
