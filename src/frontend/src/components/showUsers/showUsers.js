import React from 'react'
import './showUsers.css'

const ShowUsers = (props) => {
  const users = props.data || []

  const renderUsers = () => {
    return users.map((user, ind) => {
      const username = user.username.length > 5
        ? user.username.slice(0, 5) + '...'
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
    })
  }

  return (
    <ul className='show-user-list'>
      {renderUsers()}
    </ul>
  )
}

export default ShowUsers
