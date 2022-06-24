import { Drawer, Button, Space, InputNumber } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { changeSelectedPostTitle, changeSelectedPostBody, selectPost } from "./PostsSlice";
import { useAppDispatch } from "../../app/hooks";
import { useUpdatePostMutation, useCreatePostMutation } from "../../services/post";
import { useState, useEffect } from "react";

const initialNewPost = { id: 0, userId: 1, title: "", body: "" };

export const DrawerPost = (props: any) => {
  const { visible, setVisible, editPost, mode } = props;

  const dispatch = useAppDispatch();
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [createPost, { isSuccess }] = useCreatePostMutation();
  const [post, setPost] = useState(initialNewPost);

  const onClose = () => {
    setVisible(false);
    dispatch(selectPost(null));
  };
  const handleChangeBody = (event: any) => {
    dispatch(changeSelectedPostBody(event.target.value));
  };
  const handleSave = () => {
    updatePost({ ...editPost });
  };
  const handleCreateUserId = (value: any) => {
    setPost({ ...post, userId: value });
  };
  const handleCreateTitle = (event: any) => {
    setPost({ ...post, title: event.target.value });
  };
  const handleCreateBody = (event: any) => {
    setPost({ ...post, body: event.target.value });
  };
  const handleChangeTitle = (event: any) => {
    dispatch(changeSelectedPostTitle(event.target.value));
  };
  const handleCreate = () => {
    createPost(post);
  };

  useEffect(() => {
    if (isSuccess) {
      setVisible(false);
    }
  }, [isSuccess, setVisible]);
  useEffect(() => {
    setPost(initialNewPost);
  }, [visible]);

  return (
    <div>
      {mode === "Edit" && (
        <Drawer
          title="Edit Post"
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
            {editPost.userId}
          </h1>
          <h1>
            Title:
            <TextArea
              showCount
              style={{ height: 120 }}
              value={editPost.title}
              onChange={handleChangeTitle}
            />
          </h1>
          <h1>
            Body:
            <TextArea
              showCount
              style={{ height: 240 }}
              value={editPost.body}
              onChange={handleChangeBody}
            />
          </h1>
        </Drawer>
      )}
      {mode === "Create" && (
        <Drawer
          title="Create Post"
          placement="right"
          width={500}
          onClose={onClose}
          visible={visible}
          extra={
            <Space>
              <Button type="primary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleCreate}>
                Save
              </Button>
            </Space>
          }
        >
          <h1>
            <UserOutlined /> User ID:
            <br />
            <InputNumber min={1} onChange={handleCreateUserId} value={post.userId} />
          </h1>
          <h1>
            Title:
            <TextArea
              showCount
              style={{ height: 120 }}
              onChange={handleCreateTitle}
              value={post.title}
            />
          </h1>
          <h1>
            Body:
            <TextArea
              showCount
              style={{ height: 240 }}
              onChange={handleCreateBody}
              value={post.body}
            />
          </h1>
        </Drawer>
      )}
    </div>
  );
};

export default DrawerPost;
