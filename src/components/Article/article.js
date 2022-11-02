import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { nanoid } from '@reduxjs/toolkit'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import { apiService } from '../../services/apiService'
import selfie from '../../assets/user.png'

import classes from './article.module.scss'

export default function Article({ item }) {
  const { userData } = useSelector((state) => state.user)
  const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : ''

  const { slug, title, tagList, author, description, createdAt, favorited, favoritesCount } = item
  const { username: authorName, image: authorAvatar } = author

  const [like, setLike] = useState(favorited)
  const [likeCount, setLikeCount] = useState(favoritesCount)
  const [likeDisabled, setLikeDisabled] = useState(true)

  useEffect(() => {
    if (userData) {
      setLikeDisabled(false)
    }
  }, [userData, favorited])

  const shortOverview = (overview, maxSymbols, postfix) => {
    const pos = overview.indexOf(' ', maxSymbols)
    return pos === -1 ? overview : overview.substring(0, pos) + postfix
  }

  const likeHandler = () => {
    if (!like) {
      apiService.addLike(slug, token).then((res) => {
        if (res.article.favorited) {
          setLike(true)
          setLikeCount(res.article.favoritesCount)
        }
      })
    } else {
      apiService.removeLike(slug, token).then((res) => {
        if (!res.article.favorited) {
          setLike(false)
          setLikeCount(res.article.favoritesCount)
        }
      })
    }
  }

  const avatar = authorAvatar === 'null' ? selfie : authorAvatar

  const tags = tagList.map((tag) => <div key={nanoid()}>{tag}</div>)

  return (
    <div className={classes.article}>
      <div className={classes['article-cap']}>
        <div className={classes['article-title']}>
          <div className="flex-container">
            <h2>
              <Link to={`/articles/${slug}`}>{title ? shortOverview(title, 100, '...') : '[Title was not found]'}</Link>
            </h2>
            <button className={classes['article-rating']} type="button" onClick={likeHandler} disabled={likeDisabled}>
              {like ? (
                <HeartFilled
                  style={{ fontSize: '18px', width: '20px', height: '20px', marginRight: '4px', color: '#ed553b' }}
                />
              ) : (
                <HeartOutlined style={{ fontSize: '18px', width: '20px', height: '20px', marginRight: '4px' }} />
              )}
              <span>{likeCount}</span>
            </button>
          </div>
          <div className={classes['article-tags']}>{tags}</div>
        </div>
        <div className="flex-container-column">
          <div className={classes['article-info']}>
            <div className={classes['article-meta']}>
              <h3>{authorName}</h3>
              <span>{format(new Date(createdAt), 'MMMM d, yyyy')}</span>
            </div>
            <img src={avatar} alt="user selfie" />
          </div>
        </div>
      </div>
      <p className={classes['article-description']}>
        {description ? shortOverview(description, 150, '...') : '[Description is not specified]'}
      </p>
    </div>
  )
}
