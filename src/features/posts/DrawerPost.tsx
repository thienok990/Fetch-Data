import { Drawer, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { changeSelectedPostTitle, changeSelectedPostBody } from "./PostsSlice";
import { useAppDispatch } from "../../app/hooks";
import { useUpdatePostMutation } from "../../services/post";

export const DrawerPost = (props: any) => {
  const { visible, setVisible, editPost } = props;
  const dispatch = useAppDispatch();

  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const onClose = () => {
    setVisible(false);
  };
  const handleChangeTitle = (event: any) => {
    dispatch(changeSelectedPostTitle(event.target.value));
  };
  const handleChangeBody = (event: any) => {
    dispatch(changeSelectedPostBody(event.target.value));
  };
  const handleSave = () => {
    updatePost({ ...editPost });
  };

  return (
    <div>
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
    </div>
  );
};

export default DrawerPost;
