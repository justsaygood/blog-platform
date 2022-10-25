import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

import classes from './sign-in.module.scss'

export default function SignIn() {
  return (
    <Form layout="vertical" name="normal_login" size="large" className={classes['ant-form']}>
      <div className={classes['form-title']}>
        <span>Sign In</span>
      </div>

      <Form.Item
        className={classes['ant-form-item']}
        label="Email address"
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input placeholder="Email address" />
      </Form.Item>
      <Form.Item
        className={classes['ant-form-item']}
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item className={classes['ant-form-item-control-input-content']}>
        <Button type="primary" htmlType="submit" className={classes['login-form-button']}>
          Log in
        </Button>
        <span>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
        </span>
      </Form.Item>
    </Form>
  )
}
