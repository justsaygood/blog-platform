import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { nanoid } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { Alert, Button, Modal, Spin } from 'antd'
import { ExclamationCircleFilled, HeartFilled, HeartOutlined } from '@ant-design/icons'

import { apiService } from '../../services/apiService'
import selfie from '../../assets/user.png'
import css from '../Article/article.module.scss'

import classes from './article-full.module.scss'

export default function ArticleFull() {
  const { userData } = useSelector((state) => state.user)
  const { slug } = useParams()

  const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : ''
  // const { title, tagList, author, description, createdAt, favorited, favoritesCount } = item
  // const { username: authorName, image: authorAvatar } = author

  const [item, setItem] = useState({})
  const [likeDisabled, setLikeDisabled] = useState(true)
  const [like, setLike] = useState(item.favorited)
  const [likeCount, setLikeCount] = useState(item.favoritesCount)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    apiService
      .getArticleFull(slug, token)
      .then((res) => {
        setItem(res.article)
        setLoading(false)
        setError(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [slug, loading, userData, token])

  useEffect(() => {
    if (userData) {
      setLikeDisabled(false)
    }
  }, [userData])

  const likeHandler = () => {
    if (!like) {
      apiService.addLike(slug, token).then((res) => {
        setLike(true)
        setLikeCount(res.article.favoritesCount)
      })
    } else {
      apiService.removeLike(slug, token).then((res) => {
        setLike(false)
        setLikeCount(res.article.favoritesCount)
      })
    }
  }
  const confirmation = () => {
    Modal.confirm({
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure you want to delete this article?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        apiService.deleteArticle(slug, token).then((res) => {
          if (String(res.status)[0] === '2') {
            setIsSuccess(true)
          } else {
            setError(true)
            console.log(`error: ${res.status}`)
          }
        })
      },
    })
  }

  const articleButtons = (
    <div className={css['article-controls']}>
      <Button type="default" className="red" onClick={confirmation}>
        Delete
      </Button>
      <Button type="default" className="green">
        <Link to={`/articles/${slug}/edit`}>Edit</Link>
      </Button>
    </div>
  )

  const spinner = <Spin size="large" className={classes['form-spinner']} />

  const errorMessage = error === true && (
    <Alert description="Data loading error. Please try reloading the page." type="error" showIcon />
  )

  const successMessage = <Alert description="The article has been deleted!" />

  const article = Object.keys(item).length !== 0 && !isSuccess && (
    <div className={classes.article}>
      <div className={css['article-cap']}>
        <div className={css['article-title']}>
          <div className="flex-container">
            <h2>
              <Link to={`/articles/${slug}`}>{item.title}</Link>
            </h2>
            <button className={css['article-rating']} type="button" disabled={likeDisabled} onClick={likeHandler}>
              {item.favorited ? (
                <HeartFilled
                  style={{ fontSize: '18px', width: '20px', height: '20px', marginRight: '4px', color: '#ed553b' }}
                />
              ) : (
                <HeartOutlined style={{ fontSize: '18px', width: '20px', height: '20px', marginRight: '4px' }} />
              )}
              <span>{likeCount}</span>
            </button>
          </div>
          <div className={classes['article-tags']}>
            {item.tagList.map((tag) => (
              <div key={nanoid()} className={classes['article-tag']}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-container-column">
          <div className={css['article-info']}>
            <div className={classes['article-meta']}>
              <h3>{item.author.username}</h3>
              <span>{format(new Date(item.createdAt), 'MMMM d, yyyy')}</span>
            </div>
            <img src={item.author.image === 'null' ? selfie : item.author.image} alt="user selfie" />
          </div>
          {userData && userData.username === item.author.username ? articleButtons : null}
        </div>
      </div>
      <p className={classes['article-description']}>{item.description}</p>
      <ReactMarkdown className={classes['item-body']}>{item.body}</ReactMarkdown>
    </div>
  )

  return (
    <>
      {article}
      {loading === true && spinner}
      {errorMessage}
      {isSuccess === true && !error && successMessage}
    </>
  )
}
