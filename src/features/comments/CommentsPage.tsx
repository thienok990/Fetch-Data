import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Table, Pagination, Space, Button } from "antd";
import { useGetCommentsQuery, useDeleteCommentMutation } from "../../services/comment";
import { selectComment, setComments } from "./CommentsSlice";
import DrawerComment from "./DrawerComment";

function CommentPage() {
  const dataSource = useAppSelector((state) => state.comment.comments);

  const dispatch = useAppDispatch();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Post Id",
      dataIndex: "postId",
      key: "postId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, currentComment: any) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              dispatch(selectComment(currentComment));
              showDrawerEdit();
            }}
          >
            Edit
          </Button>
          <Button
            danger
            loading={isDeleting}
            onClick={() => {
              deleteComment(currentComment);
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
  const [mode, setMode] = useState("");
  const { isLoading, isFetching, data } = useGetCommentsQuery({ page: currentPage, limit: limit });

  useEffect(() => {
    dispatch(setComments(data?.comments || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChangePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleChangeSize = (currentPage: number, size: number) => {
    setCurrentPage(currentPage);
    setLimit(size);
  };
  const showDrawerEdit = () => {
    setVisible(true);
    setMode("Edit");
  };
  const showDrawerCreate = () => {
    setVisible(true);
    setMode("Create");
  };

  return (
    <div>
      <br />
      <Button
        type="primary"
        onClick={() => {
          dispatch(
            selectComment({
              id: 0,
              postId: 1,
              name: "",
              email: "",
              body: "",
            })
          );
          showDrawerCreate();
        }}
      >
        Create Comment
      </Button>
      <br />
      <br />
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
      <DrawerComment visible={visible} setVisible={setVisible} mode={mode} />
    </div>
  );
}

export default CommentPage;
