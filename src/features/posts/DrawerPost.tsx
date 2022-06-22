import { Drawer, Button, Space } from "antd";

export const DrawerPost = (props: any) => {
  const { visible, setVisible, selectedPost } = props;

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Drawer
        title={selectedPost.title}
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
              Oke
            </Button>
          </Space>
        }
      >
        <h1>{selectedPost.body}</h1>
      </Drawer>
    </div>
  );
};

export default DrawerPost;
