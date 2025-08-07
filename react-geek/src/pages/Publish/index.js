import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useState } from "react";
import {
  createArticleAPI,
  getArticleById,
  updateArticleAPI,
} from "@/apis/article";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  // get channel list from server
  const { channelList } = useChannel();

  // form submit
  const onFinish = (formValue) => {
    console.log(formValue);
    if (imageList.length !== imageType)
      return message.warning("Please upload right amout of images.");
    const { title, content, channel_id } = formValue;
    // process form data format for backend
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }),
      },
      channel_id,
    };
    // submit
    if (articleId) {
      updateArticleAPI({ ...reqData, id: articleId });
    } else {
      createArticleAPI(reqData);
    }
    message.success("Success!");
  };

  // upload image
  const [imageList, setImageList] = useState([]);
  const onChange = (value) => {
    //console.log("Uploading");
    setImageList(value.fileList);
  };

  // change cover num type
  const [imageType, setImageType] = useState(0);
  const onTypeChange = (e) => {
    setImageType(e.target.value);
  };

  // retrieve info when editing
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");

  // form instance
  const [form] = Form.useForm();
  useEffect(() => {
    async function getArticleDetail() {
      const res = await getArticleById(articleId);
      const data = res.data;
      const { cover } = data;
      form.setFieldsValue({
        ...data,
        type: cover.type,
      });
      setImageType(cover.type);
      setImageList(
        cover.images.map((url) => {
          return { url };
        })
      );
    }
    if (articleId) {
      getArticleDetail();
    }
  }, [articleId, form]);

  // html
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
              { title: `${articleId ? "Edit" : "Publish"} Article` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          {/* Title Input */}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input article title!" }]}
          >
            <Input placeholder="Article title" style={{ width: 400 }} />
          </Form.Item>

          {/* Channel Selection */}
          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[{ required: true, message: "Please choose channel!" }]}
          >
            <Select placeholder="Article Channel" style={{ width: 400 }}>
              {/* value will be sent to backend */}
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Cover */}
          <Form.Item label="Cover Num">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>One</Radio>
                <Radio value={3}>Three</Radio>
                <Radio value={0}>None</Radio>
              </Radio.Group>
            </Form.Item>

            {/* show upload component only when image type > 0 */}
            {imageType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                name="image"
                onChange={onChange}
                maxCount={imageType}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          {/* Multi-function Text Editor */}
          <Form.Item
            label="Content"
            name="content"
            rules={[
              { required: true, message: "Please input article content!" },
            ]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Article content"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                Publish Article
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
