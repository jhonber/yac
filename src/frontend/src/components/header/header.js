import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './header.css'

const Header = (props) => {
  let username = props.currentUser.username
  let email = props.currentUser.email
  let login = null
  let signup = null
  let logout = null

  if (!window.localStorage.token) {
    login = <Link className='header-link' to='/login'>Login</Link>
    signup = <Link className='header-link' to='/signup'>Sign up</Link>
  } else {
    email = '(' + email + ')'
    username = username || ''
    logout = <Link className='header-link' to='/logout'>Logout</Link>
  }

  return (
    <div className='header-container'>
      {username}
      {email}
      {login}
      {signup}
      {logout}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

export default connect(mapStateToProps, null)(Header)
