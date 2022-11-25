import { Breadcrumb, Layout, Menu, MenuProps, message, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import logo from "../../img/dd.jpeg";
import { Link, Outlet,useLocation,useNavigate } from "react-router-dom";
import {useStore} from '../../store/index'
import {observer} from 'mobx-react-lite'
import { http } from "../../utils";

interface userInfo{
  id: string
        photo:string
        name: string
        mobile: string
        gender: number
        birthday: string
}
interface IProps {}

const { Header, Sider } = Layout;
const OutLayout: React.FC<IProps> = () => {
  const {pathname}=useLocation();
  const {userStore,loginStore}=useStore()
  let [userInfo,setUserInfo]=useState<userInfo>()
  useEffect(()=>{
    getUser();
    userStore.getUserInfo()
  },[])
  const getUser=()=>{
     http.get('/user/profile').then((ret)=>{
          if(ret){
            setUserInfo(ret.data)
          }else{
            message.info('获取用户信息失败')
          }
     })
  }
  const navigate=useNavigate()

  //路由守卫
  const onConfirm=()=>{
    loginStore.clearToken();
    navigate('/login')
  }

  //页面静态数据区域

  type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('数据概览', '/', <HomeOutlined />),
  getItem('内容管理', '/content', <DiffOutlined />),
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
 
];
  let menuData=[
    {name:'数据概览',icon:{}}
  ]

  return (
    <Layout>
     

<Sider width={200} className="site-layout-background">
<img src={logo} alt="logo" className="logo" />

          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            style={{ height: "100%", borderRight: 0 }}
            // items={items}
            className="menu"
>
             <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to={"/"}>主页 </Link>
            </Menu.Item>
            <Menu.Item icon={<HomeOutlined />} key="/data">
              <Link to={"/data"}>数据概览 </Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/content">
              <Link to={"/content"}>内容管理 </Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/article">
              <Link to={"/article"}>发布文章 </Link>
            </Menu.Item>
            
          </Menu>
        </Sider>
      <Layout>
      <Header className="header">
        <div className="user-info">
          <span className="user-name">{userInfo?.name}</span>
          <span className="user-logout">
            <Popconfirm
            onConfirm={onConfirm} title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      
        <Layout className="layout-content" >
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(OutLayout)