import React from 'react'
import './showUsers.css'
import { connect } from 'react-redux'

const ShowUsers = (props) => {
  const users = props.data || []

  const renderUsers = () => {
    return users.map((user, ind) => {
      if (props.currentUser.username !== user.username) {
        const username = user.username.length > 5
          ? user.username.slice(0, 8) + '...'
          : user.username

        return (
          <li
            className='show-user-li'
            key={user.username + ind}
          >
            <div
              className='show-user-online'
            />
            <div
              style={{ color: user.color }}
              className='show-user-username'
            >
              {username}
            </div>
          </li>
        )
      } else return null
    })
  }

  return (
    <ul className='show-user-list'>
      {renderUsers()}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

export default connect(mapStateToProps, null)(ShowUsers)
