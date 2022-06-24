import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Table, Pagination, Space, Button } from "antd";
import { useGetPostsQuery, useDeletePostMutation } from "../../services/post";
import { selectPost, setPosts } from "./PostsSlice";
import DrawerPost from "./DrawerPost";
import ModalPost from "./ModalPost";

function PostsPage() {
  const dataSource = useAppSelector((state) => state.post.posts);
  const selectedPost = useAppSelector((state) => state.post.selectedPost);

  const dispatch = useAppDispatch();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

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
          <Button
            danger
            loading={isDeleting}
            onClick={() => {
              deletePost(action);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

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
  const showModal = () => {
    setVisibleModal(true);
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
        <DrawerPost visible={visible} setVisible={setVisible} editPost={selectedPost} />
      )}
      <br />
      <Button type="primary" onClick={showModal}>
        Create Post
      </Button>
      <ModalPost visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
    </div>
  );
}

export default PostsPage;
