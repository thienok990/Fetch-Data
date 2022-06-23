import { useEffect, useState } from "react";
import { fetchPosts } from "./PostsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Table, Pagination, Space, Button } from "antd";
import { useGetPostsQuery } from "../../services/post";
import { selectPost, setPosts } from "./PostsSlice";
import DrawerPost from "./DrawerPost";

function PostsPage() {
  const dispatch = useAppDispatch();
  const dataSource = useAppSelector((state) => state.post.posts);
  const selectedPost = useAppSelector((state) => state.post.selectedPost);
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
    {
      title: "Action",
      key: "action",
      render: (_: any, action: any) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              dispatch(selectPost(action));
              showDrawer();
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [visible, setVisible] = useState(false);

  const { isLoading, isFetching, data } = useGetPostsQuery({ page: currentPage, limit: limit });

  useEffect(() => {
    dispatch(setPosts(data?.posts));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChangePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleChangeSize = (currentPage: number, size: number) => {
    setCurrentPage(currentPage);
    setLimit(size);
  };

  const showDrawer = () => {
    setVisible(true);
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
      {selectedPost && (
        <DrawerPost visible={visible} setVisible={setVisible} selectedPost={selectedPost} />
      )}
    </div>
  );
}

export default PostsPage;
