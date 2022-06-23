import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../features/posts/PostsSlice";
type postsQuery = {
  page: number;
  limit: number;
};

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/posts" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<{ posts: Post[]; total: number }, postsQuery>({
      query: ({ page, limit }) => `?_page=${page}&_limit=${limit}`,
      transformResponse(baseQueryReturnValue: Post[], meta) {
        return {
          posts: baseQueryReturnValue,
          total: Number(meta?.response?.headers.get("X-Total-Count")),
        };
      },
      providesTags: ["Post"],
    }),
    updatePost: builder.mutation<Post, Post>({
      query: ({ id, userId, title, body }) => ({
        url: `/${id}`,
        method: "PUT",
        body: {
          userId,
          title,
          body,
        },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<Post, Post>({
      query: ({ id, userId, title, body }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});


export const { useGetPostsQuery, useUpdatePostMutation, useDeletePostMutation } = postApi;
