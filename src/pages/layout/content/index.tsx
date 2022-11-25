import {
  Table,
  Tag,
  Space,
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Radio,
  Select,
  message,
} from "antd";
import locale from "antd/lib/date-picker/locale/en_US";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import img404 from "../../../img/dd.jpeg";
import { http } from "../../../utils";
import { channel } from "diagnostics_channel";
import type { ColumnsType } from 'antd/es/table';


const { Option } = Select;
const { RangePicker } = DatePicker;
interface Channel {
  id: string;
  name: string;
}
interface DataType{
  cover:any,
  title:string
  status:string
  pubdate:string
  read_count:number
  comment_count:number
  like_count:number
}
function Content() {
  let [channelData, setChannelData] = useState<Array<Channel>>([]);

  useEffect(() => {
    getChannel();
  }, []);
  const getChannel = () => {
    http.get("/channels").then((ret) => {
      if (ret) {
        setChannelData(ret.data.channels);
        
      } else {
        message.info("获取频道失败");
      }
    });
  };
  const columns :ColumnsType<DataType> = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (value: any) => {
        return <img src={value || img404} width={80} height={60} alt="" />;
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (value: any) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      fixed:'right',
      width:'100px',
      render: (value: any) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];
  const data = [
    {
      id: "8218",
      comment_count: 0,
      cover: {
        images: ["http://geek.itheima.net/resources/images/15.jpg"],
      },
      like_count: 0,
      pubdate: "2019-03-11 09:00:00",
      read_count: 2,
      status: 2,
      title: "wkwebview离线化加载h5资源解决方案",
    },
  ];


  //table
  const [article, setArticleList] = useState({
    list: [],
    count: 0
})

// 参数管理
const [params, setParams] = useState({
    page: 1,
    per_page: 10
})

// 发送接口请求
useEffect(() => {
     function fetchArticleList() {
       http.get('/mp/articles', { params }).then((ret)=>{
        if(ret){
          const { results, total_count } = ret.data
          setArticleList({
            list: results,
            count: total_count
          })
        }else{
          message.info('获取table数据失败')
        }
       })
    
    }
    fetchArticleList()
}, [params])

//静态数据
  let statusArr=[
    {name:'全部', value:null},
    {name:'草稿', value:0},

    {name:'待审核', value:1},

    {name:'审核通过', value:2},

    {name:'审核失败', value:3},

  ]
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              {statusArr.map((f1)=> <Radio value={f1.value}>{f1.name}</Radio>  )}
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelData.map((f1) => {
                return (
                  <Option key={f1.id} value={f1.id}>
                    {f1.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker format={'YYYY-MM-DD'}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={article.list} />
      </Card>
    </div>
  );
}

export default Content;
