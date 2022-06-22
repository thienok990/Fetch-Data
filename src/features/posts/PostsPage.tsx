import React, { useEffect } from "react";
import { fetchPosts } from "./PostsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Table } from "antd";

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

function PostsPage() {
  const dispatch = useAppDispatch();
  const dataSource = useAppSelector((state) => state.post.posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
}

export default PostsPage;
