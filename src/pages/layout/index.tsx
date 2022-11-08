import { Layout, Menu, Popconfirm } from "antd";
import React from "react";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import logo from "../../img/dd.jpeg";
import { Link, Outlet,useLocation } from "react-router-dom";
interface IProps {}
const { Header, Sider } = Layout;
const OutLayout: React.FC<IProps> = () => {
  const {pathname}=useLocation();

  return (
    <Layout>
      <Header className="header">
        <img src={logo} alt="logo" className="logo" />
        <div className="user-info">
          <span className="user-name">user.name</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to={"/"}>数据概览 </Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/content">
              <Link to={"/content"}>内容管理 </Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/article">
              <Link to={"/article"}>发布文章 </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export { OutLayout };
