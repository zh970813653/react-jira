import React, { FormEvent } from 'react'
import { Auth, useAuth } from '../context/auth-content'
import { Button, Form, Input } from "antd";
import { useAsync } from '../utils/use-async';

export const RegisterScreen = ({onError}:{onError:(error:Error)=>void}) => {
  const {register,user} = useAuth() as Auth
  const {run,isLoading} = useAsync(undefined, {throwOnError: true})
    const handleSubmit = async (values:{username:string,password:string, cpassword:string }) => {
      try {
        const {username,password,cpassword} = values
        if (password !==cpassword) {
          return onError(new Error('两次密码输入不一致'))
        }
        await run(register({username,password}))
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
      <Input type='password' placeholder="密码" />
    </Form.Item>
    <Form.Item
      name="cpassword"
      rules={[{ required: true, message: "请确认密码" }]}
    >
      <Input type='password' placeholder="确认密码" />
    </Form.Item>
    <Form.Item >
      <Button loading={isLoading} type="primary" htmlType="submit">
        注册 
      </Button>
    </Form.Item>
  </Form>
  )
}
