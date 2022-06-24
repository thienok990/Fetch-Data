import { Drawer, Button, Space, InputNumber } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import {
  changeSelectedPostTitle,
  changeSelectedPostBody,
  changeSelectedPostUserId,
} from "./PostsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useUpdatePostMutation, useCreatePostMutation } from "../../services/post";
import { useEffect } from "react";

export const DrawerPost = (props: any) => {
  const { visible, setVisible, mode } = props;
  const selectedPost = useAppSelector((state) => state.post.selectedPost);

  const dispatch = useAppDispatch();
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [createPost, { isSuccess }] = useCreatePostMutation();

  const onClose = () => {
    setVisible(false);
  };
  const handleSave = () => {
    if (!selectedPost) {
      return;
    }

    if (mode === "Edit") {
      updatePost({ ...selectedPost });
    } else {
      createPost({ ...selectedPost });
    }
  };
  const handleChangeBody = (event: any) => {
    dispatch(changeSelectedPostBody(event.target.value));
  };
  const handleChangeTitle = (event: any) => {
    dispatch(changeSelectedPostTitle(event.target.value));
  };
  const handleChangeUserId = (value: number) => {
    dispatch(changeSelectedPostUserId(value));
  };

  useEffect(() => {
    if (isSuccess) {
      setVisible(false);
    }
  }, [isSuccess, setVisible]);

  if (selectedPost === null) {
    return <></>;
  }

  return (
    <div>
      <Drawer
        title={mode === "Edit" ? "Edit Post" : "Create Post"}
        placement="right"
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
          <UserOutlined />
          {mode === "Edit" ? (
            selectedPost.userId
          ) : (
            <InputNumber min={1} onChange={handleChangeUserId} value={selectedPost.userId} />
          )}
        </h1>
        <h1>
          Title:
          <TextArea
            showCount
            style={{ height: 120 }}
            value={selectedPost.title}
            onChange={handleChangeTitle}
          />
        </h1>
        <h1>
          Body:
          <TextArea
            showCount
            style={{ height: 240 }}
            value={selectedPost.body}
            onChange={handleChangeBody}
          />
        </h1>
      </Drawer>
    </div>
  );
};

export default DrawerPost;
