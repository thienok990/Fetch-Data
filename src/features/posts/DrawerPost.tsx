import { Drawer, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
export const DrawerPost = (props: any) => {
  const { visible, setVisible, selectedPost } = props;

  const onClose = () => {
    setVisible(false);
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
          {selectedPost.userId}
        </h1>
        <h1>
          Title:
          <TextArea showCount style={{ height: 120 }} value={selectedPost.title} />
        </h1>
        <h1>
          Body:
          <TextArea showCount style={{ height: 240 }} value={selectedPost.body} />
        </h1>
      </Drawer>
    </div>
  );
};

export default DrawerPost;
