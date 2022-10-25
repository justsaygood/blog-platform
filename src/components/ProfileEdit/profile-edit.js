import React from 'react'
import { Form, Input, Button } from 'antd'

import classes from '../SignIn/sign-in.module.scss'

export default function ProfileEdit() {
  return (
    <Form name="dynamic_form_item" layout="vertical" size="large" className={classes['ant-form']}>
      <div className={classes['form-title']}>
        <span>Edit Profile</span>
      </div>

      <Form.Item
        className={classes['ant-form-item']}
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Your username must be 3 to 20 characters long.',
            min: 3,
            max: 20,
          },
        ]}
      >
        <Input type="text" />
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
        <Input />
      </Form.Item>

      <Form.Item
        className={classes['ant-form-item']}
        name="password"
        label="New password"
        rules={[
          {
            message: 'Your password must be 6 to 40 characters long.',
            min: 6,
            max: 40,
          },
        ]}
      >
        <Input.Password type="password" placeholder="New password" />
      </Form.Item>

      <Form.Item
        className={classes['ant-form-item']}
        name="image"
        label="Avatar image (url)"
        rules={[
          {
            type: 'url',
            warningOnly: true,
          },
        ]}
      >
        <Input placeholder="Avatar image" />
      </Form.Item>

      <Form.Item className={classes['ant-form-item-control-input-content']}>
        <Button type="primary" htmlType="submit" className={classes['login-form-button']}>
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
