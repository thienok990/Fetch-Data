import { Drawer, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { changeSelectedPostTitle, changeSelectedPostBody } from "./PostsSlice";
import { useAppDispatch } from "../../app/hooks";

export const DrawerPost = (props: any) => {
  const { visible, setVisible, editPost } = props;
  const dispatch = useAppDispatch();

  const onClose = () => {
    setVisible(false);
  };
  const hanldeTitle = () => {
    dispatch(changeSelectedPostTitle(editPost.title));
  };
  const hanldeBody = () => {
    dispatch(changeSelectedPostBody(editPost.body));
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
            <Button type="primary" onClick={onClose}>
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
            onChange={hanldeTitle}
          />
        </h1>
        <h1>
          Body:
          <TextArea showCount style={{ height: 240 }} value={editPost.body} onChange={hanldeBody} />
        </h1>
      </Drawer>
    </div>
  );
};

export default DrawerPost;
