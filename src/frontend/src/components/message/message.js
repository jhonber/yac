import React from 'react'
import './message.css'

const Message = (props) => {
  const message = props.data
  return (
    <div>
      <span className='msg-username'>
        {message.username}
      </span>
      <span>{message.text}</span>
      <span>{message.date}</span>
    </div>
  )
}

export default Message
