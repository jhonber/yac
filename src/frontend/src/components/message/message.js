import React from 'react'
import './message.css'

const Message = (props) => {
  console.log(props.showMonth)
  const message = props.data
  const date = new Date(message.date)
  let minutes = date.getMinutes()
  minutes = minutes < 10 ? '0' + minutes : minutes

  const [, month, day] = date.toDateString().split(' ')
  const classeNames = 'msg-month-day-div' + (props.showMonth
    ? ''
    : ' msg-hide')

  return (
    <div className='msg-main'>
      <div className={classeNames}>
        <span className='msg-month-day'>{month}  {day}</span>
      </div>
      <div>
        <span className='msg-date'>
          {date.getHours()}:{minutes}
        </span>
        <span className='msg-username'>
          {message.username}:
        </span>
        <span className='msg-content'>
          {message.content}
        </span>
      </div>
    </div>
  )
}

export default Message
