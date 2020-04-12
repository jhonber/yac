import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => {
  let username = null
  let login = null
  let signup = null
  let logout = null

  if (!window.localStorage.token) {
    login = <Link className='header-link' to='/login'>Login</Link>
    signup = <Link className='header-link' to='/signup'>Sign up</Link>
  } else {
    // TODO: access to current user info and get username
    username = 'jhon'
    logout = <Link className='header-link' to='/logout'>Logout</Link>
  }

  return (
    <div className='header-container'>
      {username}
      {login}
      {signup}
      {logout}
    </div>
  )
}

export default Header
