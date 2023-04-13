import React, { FormEvent } from 'react'
import { Auth, useAuth } from '../context/auth-content'
import { Button, Form, Input } from "antd";

export const RegisterScreen = () => {
  const {register,user} = useAuth() as Auth
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        register({username,password})
    }
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
        注册 
      </Button>
    </Form.Item>
  </Form>
  )
}
