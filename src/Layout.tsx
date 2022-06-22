import { Layout, Menu } from "antd";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import CounterPage from "./features/counter/CounterPage";
import PostPage from "./features/posts/PostsPage";
import React from "react";

const { Header, Content, Footer } = Layout;

const pages = [
  {
    key: "/post",
    label: <Link to="/post">Posts</Link>,
  },
  {
    key: "/counter",
    label: <Link to="/counter">Counter</Link>,
  },
] as any;

const App: React.FC = () => {
  const location = useLocation();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} items={pages} />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Navigate to="Post" />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/counter" element={<CounterPage />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

export default App;
