import { useEffect, useState } from "react";
import { fetchPosts } from "./PostsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Table, Pagination } from "antd";
import { useGetPostsQuery } from "../../services/post";
import { setPosts } from "./PostsSlice";

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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { isLoading, isFetching, data } = useGetPostsQuery({ page: currentPage, limit: limit });

  useEffect(() => {
    dispatch(setPosts(data?.posts));
  }, [data]);

  const handleChangePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleChangeSize = (currentPage: number, size: number) => {
    setCurrentPage(currentPage);
    setLimit(size);
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={false}
        loading={isLoading || isFetching}
      />
      {!isLoading && (
        <Pagination
          defaultCurrent={1}
          pageSize={limit}
          total={data?.total}
          current={currentPage}
          onChange={handleChangePage}
          onShowSizeChange={handleChangeSize}
        />
      )}
    </div>
  );
}

export default PostsPage;
