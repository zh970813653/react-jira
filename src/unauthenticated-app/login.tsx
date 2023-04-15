import React, { FormEvent } from "react";
import { Auth, useAuth } from "../context/auth-content";
import { Button, Form, Input } from "antd";
import { useAsnc } from "../utils/use-async";

export const LoginScreen = ({onError}:{onError:(error:Error)=>void}) => {
  const { login, user } = useAuth() as Auth;
  const {run,isLoading} = useAsnc(undefined, {throwOnError: true})
  const handleSubmit = async (values:{username:string,password:string  }) => {
    try {
      await run(login(values))
    } catch (error) {
      onError(error as Error)
    }
    
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
        <Button loading={isLoading} type="primary" htmlType="submit">
          登陆 
        </Button>
      </Form.Item>
    </Form>
  );
};
