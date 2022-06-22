import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../features/posts/PostsSlice";
type postsQuery = {
  page: number;
  limit: number;
};
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/posts" }),
  endpoints: (builder) => ({
    getPosts: builder.query<{ posts: Post[]; total: number }, postsQuery>({
      query: ({ page, limit }) => `?_page=${page}&_limit=${limit}`,
      transformResponse(baseQueryReturnValue: Post[], meta) {
        return {
          posts: baseQueryReturnValue,
          total: Number(meta?.response?.headers.get("X-Total-Count")),
        };
      },
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
