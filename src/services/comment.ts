import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Comment } from "../features/comments/CommentsSlice";

type commentsQuery = {
  page: number;
  limit: number;
};

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/comments" }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query<{ comments: Comment[]; total: number }, commentsQuery>({
      query: ({ page, limit }) => `?_page=${page}&_limit=${limit}`,
      transformResponse(baseQueryReturnValue: Comment[], meta) {
        return {
          comments: baseQueryReturnValue,
          total: Number(meta?.response?.headers.get("X-total-Count")),
        };
      },
      providesTags: ["Comment"],
    }),
    updateComment: builder.mutation<Comment, Comment>({
      query: ({ id, postId, name, email, body }) => ({
        url: `/${id}`,
        method: "PUT",
        body: {
          postId,
          name,
          email,
          body,
        },
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation<Comment, Comment>({
      query: ({ id, postId, email, name, body }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
    createComment: builder.mutation<Comment, Comment>({
      query: ({ postId, email, name, body }) => ({
        url: `/`,
        method: "POST",
        body: {
          postId,
          name,
          email,
          body,
        },
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useCreateCommentMutation,
} = commentApi;
