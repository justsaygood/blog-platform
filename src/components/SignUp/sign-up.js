import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Divider } from 'antd'

import classes from '../SignIn/sign-in.module.scss'

export default function SignUp() {
  return (
    <Form layout="vertical" size="large" className={classes['ant-form']}>
      <div className={classes['form-title']}>
        <span>Create new account</span>
      </div>

      <Form.Item
        className={classes['ant-form-item']}
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Your username must be between 3 and 20 characters long.',
            min: 3,
            max: 20,
          },
        ]}
      >
        <Input type="text" placeholder="Username" />
      </Form.Item>

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
            message: 'Your password must be 6 to 40 characters long.',
            min: 6,
            max: 40,
          },
        ]}
      >
        <Input.Password type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item
        className={classes['ant-form-item']}
        name="confirm"
        label="Repeat Password"
        dependencies={['password']}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Divider className={classes['ant-divider']} />

      <Form.Item className={classes['ant-form-item']} name="agreement" valuePropName="checked">
        <Checkbox>I agree to the processing of my personal information</Checkbox>
      </Form.Item>
      <Form.Item className={classes['ant-form-item-control-input-content']}>
        <Button type="primary" htmlType="submit" className={classes['login-form-button']}>
          Create
        </Button>
        <span>
          Don’t have an account? <Link to="/sign-in">Sign In</Link>.
        </span>
      </Form.Item>
    </Form>
  )
}
