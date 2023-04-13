import React, { FormEvent } from "react";
import { Auth, useAuth } from "../context/auth-content";
import { Button, Form, Input } from "antd";

export const LoginScreen = () => {
  const { login, user } = useAuth() as Auth;
  const handleSubmit = (values:{username:string,password:string  }) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit} >
      <Form.Item

        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item

        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input placeholder="密码" />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">
          登陆 
        </Button>
      </Form.Item>
    </Form>
  );
};
