import React from 'react'
import './showUsers.css'

const ShowUsers = (props) => {
  const users = props.data || []

  const renderUsers = () => {
    return users.map((user, ind) => {
      return (
        <li
          className='show-user-li'
          key={user.username + ind}
        >
          <div
            className='show-user-online'
          />
          <div
            className='show-user-username'
          >
            {user.username}
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
