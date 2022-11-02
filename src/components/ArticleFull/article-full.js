import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'antd'
import { ExclamationCircleFilled, HeartOutlined } from '@ant-design/icons'

import user from '../../assets/user.png'
import css from '../Article/article.module.scss'

import classes from './article-full.module.scss'

export default function ArticleFull() {
  const confirmation = () => {
    Modal.confirm({
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure you want to delete this article?',
      okText: 'Yes',
      cancelText: 'No',
    })
  }

  const articleButtons = (
    <div className={css['article-controls']}>
      <Button type="default" className="red" onClick={confirmation}>
        Delete
      </Button>
      <Button type="default" className="green">
        <Link to="/articles/:id/edit">Edit</Link>
      </Button>
    </div>
  )

  return (
    <div className={classes.article}>
      <div className={css['article-cap']}>
        <div className={css['article-title']}>
          <div className="flex-container">
            <h2>Some Article title</h2>
            <div className={css['article-rating']}>
              <HeartOutlined style={{ fontSize: '18px' }} />
              <span>9</span>
            </div>
          </div>
          <div className={classes['article-tags']}>Tags</div>
          <p className={classes['article-description']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex-container-column shrink0">
          <div className={classes['article-info']}>
            <div className={classes['article-meta']}>
              <h3>John Doe</h3>
              <span>24, March 2022</span>
            </div>
            <img src={user} alt="user selfie" />
          </div>
          {articleButtons}
        </div>
      </div>
    </div>
  )
}
