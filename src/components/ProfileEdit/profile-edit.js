import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Spin, Alert, notification } from 'antd'
import { SmileTwoTone } from '@ant-design/icons'

import { fetchUserUpdate, errorNull } from '../../store/userSlice'
import classes from '../SignIn/sign-in.module.scss'

export default function ProfileEdit() {
  const dispatch = useDispatch()
  const { error, status, userData } = useSelector((state) => state.user)

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [token, setToken] = useState('')

  const [isSuccess, setSuccess] = useState(false)

  useEffect(() => {
    if (userData) {
      setEmail(userData.email)
      setUsername(userData.username)
      setToken(userData.token)
    }

    if (status === 'loading') {
      setSuccess(false)
    }
  }, [status, userData])

  const successMessage = () => {
    notification.open({
      message: 'Your profile has been updated!',
      icon: <SmileTwoTone twoToneColor="#eb2f96" />,
      duration: 8,
    })
  }

  const editProfile = (val) => {
    const newUser = { ...userData }
    Object.keys(val).forEach((prop) => {
      newUser[prop] = val[prop]
    })

    dispatch(fetchUserUpdate({ newUser, token })).then((res) => {
      try {
        localStorage.removeItem('token')
        localStorage.setItem('token', JSON.stringify(res.payload.user.token))
        setSuccess(true)
        successMessage()
      } catch (err) {
        setSuccess(false)
        console.log(err)
      }
    })
  }

  const [data] = useState([
    {
      name: ['username'],
      value: username || '',
    },
    {
      name: ['email'],
      value: email || '',
    },
  ])

  const profileForm = (
    <Form
      name="dynamic_form_item"
      layout="vertical"
      size="large"
      className={classes['ant-form']}
      onFinish={(val) => {
        editProfile(val)
      }}
      data={data}
    >
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

  const onClose = () => {
    dispatch(errorNull())
  }

  const spinner = <Spin size="large" className={classes['form-spinner']} />

  const errorMessage = (
    <Alert description="Whoops, something went wrong :(" type="error" showIcon closable onClose={onClose} />
  )

  return (
    <>
      {profileForm}
      {status === 'loading' && spinner}
      {error && errorMessage}
      {isSuccess}
    </>
  )
}
