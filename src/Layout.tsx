import { Layout, Menu } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import CounterPage from "./features/counter/CounterPage";
import React from "react";

const { Header, Content, Footer } = Layout;
const App: React.FC = () => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["post"]}>
        <Menu.Item key="posts">
          <Link to="/">Posts</Link>
        </Menu.Item>
        <Menu.Item key="counter">
          <Link to="/counter">Counter</Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: "0 50px" }}>
      <div className="site-layout-content">
        <Routes>
          <Route path="/" element={<h1>posts</h1>} />
          <Route path="counter" element={<CounterPage />} />
        </Routes>
      </div>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);

export default App;
