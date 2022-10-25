import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Pagination } from 'antd'

import Articles from '../Articles/articles'
import Header from '../Header/header'
import ArticleFull from '../ArticleFull/article-full'
import ArticleCreate from '../ArticleForm/ArticleCreate/article-create'
import ArticleEdit from '../ArticleForm/ArticleEdit/article-edit'
import SignUp from '../SignUp/sign-up'
import SignIn from '../SignIn/sign-in'
import ProfileEdit from '../ProfileEdit/profile-edit'

import 'antd/dist/antd.min.css'
import classes from './app.module.scss'

function App() {
  return (
    <div>
      <Header />
      <section className={classes.main}>
        <Switch>
          <Route path="/articles/:id/edit" component={ArticleEdit} />
          <Route path="/articles/:id" exact component={ArticleFull} />
          <Route path="/articles" exact component={Articles} />
          <Route path="/" exact component={Articles} />
          <Route path="/new-article" component={ArticleCreate} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/profile" component={ProfileEdit} />
        </Switch>
        <Pagination size="small" />
      </section>
    </div>
  )
}

export default App
