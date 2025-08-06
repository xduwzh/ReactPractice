import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
} from "antd";
import locale from "antd/es/date-picker/locale/en_US";
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.jpg";
import { useChannel } from "@/hooks/useChannel";
import { useEffect, useState } from "react";
import { getArticleListAPI } from "@/apis/article";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const { channelList } = useChannel();

  // article status
  const status = {
    1: <Tag color="warning">Await Approvement</Tag>,
    2: <Tag color="success">Approved</Tag>,
  };

  // mock col data
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
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
      render: (data) => status[data],
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
      render: (data) => {
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

  // mock body data
  const data = [
    {
      id: "8218",
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: "2019-03-11 09:00:00",
      read_count: 2,
      status: 2,
      title: "wkwebview离线化加载h5资源解决方案",
    },
  ];

  // get article list
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI();
      setList(res.data.results);
      setCount(res.data.total_count);
    }
    getList();
  }, []);

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
              { title: "Article List" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={""}>All</Radio>
              <Radio value={0}>Drafts</Radio>
              <Radio value={2}>Approved</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="Select Article Channel"
              defaultValue="--List--"
              style={{ width: 120 }}
            >
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`${count} result(s)：`}>
        <Table rowKey="id" columns={columns} dataSource={list} />
      </Card>
    </div>
  );
};

export default Article;
