import React from 'react'
import './showUsers.css'

const ShowUsers = (props) => {
  const users = props.data
  const renderUsers = () => {
    return users.map((user, ind) => {
      return (
        <li
          key={user.email}
        >
          - {user.username}
        </li>
      )
    })
  }

  return (
    <ul className='showUsers-list'>
      {renderUsers()}
    </ul>
  )
}

export default ShowUsers
