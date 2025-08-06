import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Popconfirm,
} from "antd";
import locale from "antd/es/date-picker/locale/en_US";
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.jpg";
import { useChannel } from "@/hooks/useChannel";
import { useEffect, useState } from "react";
import { delArticleAPI, getArticleListAPI } from "@/apis/article";

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
            <Popconfirm
              title="Delete the article"
              description="Are you sure to delete this article?"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
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

  // article filter feature
  // params
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 4,
  });

  // get article list
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData);
      setList(res.data.results);
      setCount(res.data.total_count);
    }
    getList();
  }, [reqData]);

  // get data from form
  const onFinish = (formValue) => {
    // console.log(formValue);
    // update params
    setReqData({
      ...reqData,
      channel_id: formValue.channel_id,
      status: formValue.status,
      begin_pubdate: formValue.date[0].format("YYYY-MM-DD"),
      end_pubdate: formValue.date[1].format("YYYY-MM-DD"),
    });
  };

  // turn page
  const onPageChange = (page) => {
    setReqData({
      ...reqData,
      page,
    });
  };

  // confirm delete article
  const onConfirm = async (data) => {
    await delArticleAPI(data.id);
    setReqData({
      ...reqData,
    });
  };
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
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
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
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: reqData.per_page,
            onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
