import React, { useEffect } from "react";
import { fetchPosts, fetchPostsByUserId } from "./PostsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Table } from "antd";

function PostsPage() {
  const dispatch = useAppDispatch();
  const dataSource = useAppSelector((state) => state.post.posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
}

export default PostsPage;
