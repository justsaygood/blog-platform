import React from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'

import user from '../../assets/user.png'

import classes from './articles.module.scss'

export default function Articles() {
  return (
    <div className={classes.article}>
      <div className={classes['article-cap']}>
        <div className={classes['article-title']}>
          <div className="flex-container">
            <h2>
              <Link to="/articles/:id">Some article title</Link>
            </h2>
            <div className={classes['article-rating']}>
              <HeartOutlined style={{ fontSize: '18px' }} />
              <span>12</span>
            </div>
          </div>
          <div className={classes['article-tags']}>Tags</div>
        </div>
        <div className="flex-container-column">
          <div className={classes['article-info']}>
            <div className={classes['article-meta']}>
              <h3>John Doe</h3>
              <span>March 5, 2022</span>
            </div>
            <img src={user} alt="user selfie" />
          </div>
        </div>
      </div>
      <p className={classes['article-description']}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </div>
  )
}
