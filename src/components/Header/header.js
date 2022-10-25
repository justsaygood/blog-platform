import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import classes from '../App/app.module.scss'
import user from '../../assets/user.png'

export default function Header() {
  return (
    <header className={classes.header}>
      <h1>
        <Link to="/">Realworld Blog</Link>
      </h1>
      <div>
        loggedIn ? (
        <Button type="default" className="green">
          <Link to="/new-article">Create article</Link>
        </Button>
        <Link to="/profile">
          <div className={classes.user}>
            <span>John Doe</span>
            <img src={user} alt="user selfie" />
          </div>
        </Link>
        <Button type="default" size="large">
          <Link to="/">Log Out</Link>
        </Button>
        ) : (
        <Button type="text" size="large">
          <Link to="/sign-in">Sign In</Link>
        </Button>
        <Button type="default" size="large" className="green">
          <Link to="/sign-up">Sign Up</Link>
        </Button>
        )
      </div>
    </header>
  )
}
