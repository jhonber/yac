import React from 'react'
import {
  useHistory,
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import './header.css'

import { currectUser } from '../redux/actions/users'

const Header = (props) => {
  let username = props.currentUser.username
  let email = props.currentUser.email
  let login = null
  let signup = null
  let logoutLink = null

  const history = useHistory()

  const logout = () => {
    const process = () => {
      props.currectUser()
      delete window.localStorage.token
      delete window.localStorage.username
      history.push('/login')
    }

    return (
      <Link
        className='header-link'
        to='#'
        onClick={process}
      >
        Logout
      </Link>
    )
  }

  if (!window.localStorage.token) {
    login = <Link className='header-link' to='/login'>Login</Link>
    signup = <Link className='header-link' to='/signup'>Sign up</Link>
  } else {
    email = '(' + email + ')'
    username = username || ''
    logoutLink = logout()
  }

  return (
    <div className='header-container'>
      {username}
      {email}
      {login}
      {signup}
      {logoutLink}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

const mapDispatchToProps = (dispatch) => ({
  currectUser: () => dispatch(currectUser({}))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
