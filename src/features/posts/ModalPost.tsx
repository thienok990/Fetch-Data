import { Modal, Button, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { UserOutlined } from "@ant-design/icons";
import { useCreatePostMutation } from "../../services/post";
import { useEffect, useState } from "react";

const initialNewPost = { id: 0, userId: 1, title: "", body: "" };

export const ModalPost = (props: any) => {
  const { visibleModal, setVisibleModal } = props;
  const [post, setPost] = useState(initialNewPost);
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();

  const closeModal = () => {
    setVisibleModal(false);
  };
  const handleChangeUserId = (value: any) => {
    setPost({ ...post, userId: value });
  };
  const handleChangeTitle = (event: any) => {
    setPost({ ...post, title: event.target.value });
  };
  const handleChangeBody = (event: any) => {
    setPost({ ...post, body: event.target.value });
  };
  const handleCreate = () => {
    createPost(post);
  };

  useEffect(() => {
    if (isSuccess) {
      setVisibleModal(false);
    }
  }, [isSuccess, setVisibleModal]);
  useEffect(() => {
    setPost(initialNewPost);
  }, [visibleModal]);

  return (
    <div>
      <Modal
        title="Create Post"
        visible={visibleModal}
        onCancel={closeModal}
        footer={[
          <Button key="back" danger onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreate} loading={isLoading}>
            Create
          </Button>,
        ]}
      >
        <h1>
          <UserOutlined /> User ID:
          <br />
          <InputNumber min={1} onChange={handleChangeUserId} value={post.userId} />
        </h1>
        <h1>
          Title:
          <TextArea
            showCount
            style={{ height: 120 }}
            onChange={handleChangeTitle}
            value={post.title}
          />
        </h1>
        <h1>
          Body:
          <TextArea
            showCount
            style={{ height: 240 }}
            onChange={handleChangeBody}
            value={post.body}
          />
        </h1>
      </Modal>
    </div>
  );
};
export default ModalPost;
