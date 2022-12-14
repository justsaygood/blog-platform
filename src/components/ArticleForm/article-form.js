import React from 'react'
import { Form, Input, Button } from 'antd'

import classes from './ArticleCreate/article-create.module.scss'

export default function ArticleForm({ transferData, title }) {
  const onFinish = (str) => {
    transferData(str)
  }

  return (
    <Form size="large" name="dynamic_form_item" layout="vertical" className={classes['ant-form']} onFinish={onFinish}>
      <div className={classes['form-title']}>
        <span>{title}</span>
      </div>
      <Form.Item
        className={classes['ant-form-item']}
        name="title"
        label="Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="text" placeholder="Title" />
      </Form.Item>

      <Form.Item
        className={classes['ant-form-item']}
        name="description"
        label="Short description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="text" placeholder="Short description" />
      </Form.Item>

      <Form.Item
        className={classes['ant-form-item']}
        name="body"
        label="Text"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea type="text" placeholder="Text" className={classes['ant-input']} />
      </Form.Item>

      <div className={classes['form-item-list__wrapper']}>
        <Form.List name="tagList">
          {(fieldsList, { add, remove }) => (
            <>
              {fieldsList.map((field, index) => (
                <Form.Item label={index === 0 ? 'Tags' : ''} className={classes['ant-form-item']} key={field.key}>
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  <Form.Item {...field} noStyle>
                    <Input placeholder="Tag" style={{ width: '40%' }} />
                  </Form.Item>

                  {fieldsList.length > 1 ? (
                    <Button
                      onClick={() => {
                        remove(field.name)
                      }}
                      className={classes['form-item-list__del-button']}
                    >
                      Delete
                    </Button>
                  ) : null}
                </Form.Item>
              ))}

              <Form.Item className={classes['form-item-list__add-button']}>
                <Button
                  type="dashed"
                  onClick={() => {
                    add()
                  }}
                >
                  Add tag
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item className={classes['ant-form-item']}>
          <Button type="primary" htmlType="submit" className={classes['form-item-list__send-button']}>
            Send
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
