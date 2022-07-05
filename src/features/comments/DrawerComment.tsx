import { Drawer, Button, Space, InputNumber } from "antd";
import { BookOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import {
  changeSelectedCommentName,
  changeSelectedCommentBody,
  changeSelectedCommentPostId,
  changeSelectedCommentEmail,
} from "./CommentsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useUpdateCommentMutation, useCreateCommentMutation } from "../../services/comment";
import { useEffect } from "react";

export const DrawerComment = (props: any) => {
  const { visible, setVisible, mode } = props;
  const selectedComment = useAppSelector((state) => state.comment.selectedComment);

  const dispatch = useAppDispatch();
  const [updateComment, { isLoading }] = useUpdateCommentMutation();
  const [createComment, { isSuccess }] = useCreateCommentMutation();

  const onClose = () => {
    setVisible(false);
  };
  const handleSave = () => {
    if (!selectedComment) {
      return;
    }

    if (mode === "Edit") {
      updateComment({ ...selectedComment });
    } else {
      createComment({ ...selectedComment });
    }
  };
  const handleChangePostId = (value: number) => {
    dispatch(changeSelectedCommentPostId(value));
  };
  const handleChangeName = (event: any) => {
    dispatch(changeSelectedCommentName(event.target.value));
  };
  const handleChangeBody = (event: any) => {
    dispatch(changeSelectedCommentBody(event.target.value));
  };
  const handleChangeEmail = (event: any) => {
    dispatch(changeSelectedCommentEmail(event.target.value));
  };

  useEffect(() => {
    if (isSuccess) {
      setVisible(false);
    }
  }, [isSuccess, setVisible]);

  if (selectedComment === null) {
    return <></>;
  }

  return (
    <div>
      <Drawer
        title={mode === "Edit" ? "Edit Comment" : "Create Comment"}
        placement={mode === "Edit" ? "right" : "left"}
        width={500}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button type="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSave} loading={isLoading}>
              Save
            </Button>
          </Space>
        }
      >
        <h1>
          <BookOutlined />
          {mode === "Edit" ? (
            selectedComment.postId
          ) : (
            <InputNumber min={1} onChange={handleChangePostId} value={selectedComment.postId} />
          )}
        </h1>
        <h1>
          Name:
          <TextArea
            showCount
            style={{ height: 120 }}
            value={selectedComment.name}
            onChange={handleChangeName}
          />
        </h1>
        <h1>
          Email:
          <TextArea
            showCount
            style={{ height: 120 }}
            value={selectedComment.email}
            onChange={handleChangeEmail}
          />
        </h1>
        <h1>
          Body:
          <TextArea
            showCount
            style={{ height: 240 }}
            value={selectedComment.body}
            onChange={handleChangeBody}
          />
        </h1>
      </Drawer>
    </div>
  );
};

export default DrawerComment;
