import React from "react";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { sendData } from "../../server/common";
import { TOKEN } from "../../const";

const Login = () => {
  const onFinish = (values) => {
    sendData("auth/login", values)
      .then((res) => {
        localStorage.setItem(TOKEN, res.data.jwt);
        toast.success("Xush kelibsiz");
        window.location.href = "/dashboard";
      })
      .catch(() => {
        toast.error("Username yoki password xato!");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        marginLeft: "300px",
        marginTop: "170px",
      }}
    >
      <h1 style={{ marginLeft: 200 }}>Admin panel kirish uchun :</h1>
      <h2 style={{ marginLeft: 200 }}>
        username: admin <br />
        password: 123
      </h2>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          marginTop: 70,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="usernames"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
