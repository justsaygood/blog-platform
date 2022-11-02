import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { fetchUserSave } from '../../store/userSlice'
import Header from '../Header/header'
import ArticleList from '../ArticleList/article-list'
import ArticleFull from '../ArticleFull/article-full'
import ArticleCreate from '../ArticleForm/ArticleCreate/article-create'
import ArticleEdit from '../ArticleForm/ArticleEdit/article-edit'
import SignUp from '../SignUp/sign-up'
import SignIn from '../SignIn/sign-in'
import ProfileEdit from '../ProfileEdit/profile-edit'

import 'antd/dist/antd.min.css'
import classes from './app.module.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      if (JSON.parse(localStorage.getItem('token'))) {
        dispatch(fetchUserSave(JSON.parse(localStorage.getItem('token'))))
      }
    } catch (err) {
      console.log(err)
    }
  }, [dispatch])

  return (
    <div>
      <Header />
      <section className={classes.main}>
        <Switch>
          <Route path="/articles/:slug/edit" component={ArticleEdit} />
          <Route path="/articles/:slug" exact component={ArticleFull} />
          <Route path="/articles" exact component={ArticleList} />
          <Route path="/" exact component={ArticleList} />
          <Route path="/new-article" component={ArticleCreate} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/profile" component={ProfileEdit} />
        </Switch>
      </section>
    </div>
  )
}

export default App
