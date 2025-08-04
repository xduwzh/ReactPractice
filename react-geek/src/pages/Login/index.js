import "./index.scss";
import { Card, Form, Input, Button, message } from "antd";
import logo from "@/assets/Logo.svg";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    await dispatch(fetchLogin(values));
    //redirect to home page
    navigate("/");
    message.success("Logined Successfully");
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* Login Form */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: "Please input your username!" },
              // {
              //   pattern: new RegExp("^(?!\\d)[\\u4e00-\\u9fa5\\w]{4,12}$"),
              //   message: "Enter correct format",
              // },
            ]}
          >
            <Input size="large" placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                pattern: new RegExp("^.{4,20}$"),
                message: "Enter correct format",
              },
            ]}
          >
            <Input size="large" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
