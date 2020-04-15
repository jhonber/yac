import React from 'react'
import './message.css'

const Message = (props) => {
  const message = props.data
  const username = message.username.length > 5
    ? message.username.slice(0, 5) + '...'
    : message.username
  const date = new Date(message.date)
  let minutes = date.getMinutes()
  minutes = minutes < 10 ? '0' + minutes : minutes

  const [, month, day] = date.toDateString().split(' ')
  const classeNames = 'msg-month-day-div' + (!props.showMonth
    ? ' msg-hide'
    : '')

  const youtubeCmd = props.config.youtubeCmd
  const isVideo = (message.content.indexOf(youtubeCmd) === 0)
  const videoId = message.content.split(youtubeCmd)[1]

  const videoPlayer = () => {
    const src = props.config.youtubeEmbed + videoId
    return (
      <iframe
        className='videoPlayer'
        title={videoId}
        width='300'
        height='150'
        allowfullscreen='allowfullscreen'
        mozallowfullscreen='mozallowfullscreen'
        msallowfullscreen='msallowfullscreen'
        oallowfullscreen='oallowfullscreen'
        webkitallowfullscreen='webkitallowfullscreen'
        src={src}
      />
    )
  }

  const renderMessage = () => {
    return (
      <div className='msg-main'>
        <div className={classeNames}>
          <span
            className='msg-month-day'
          >
            {month} {day}
          </span>
        </div>
        <div>
          <span className='msg-date'>
            {date.getHours()}:{minutes}
          </span>
          <span
            style={{ color: message.color }}
            className='msg-username'
          >
            {username}:
          </span>
          <span className='msg-content'>
            {isVideo && videoPlayer()}
            {!isVideo && message.content}
          </span>
        </div>
      </div>
    )
  }

  const renderStatus = () => {
    return (
      <div className='room-status'>
        {message.content}
      </div>
    )
  }

  return (
    <div>
      {message.username === '' && renderStatus()}
      {message.username !== '' && renderMessage()}
    </div>
  )
}

export default Message
