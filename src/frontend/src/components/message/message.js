import React from 'react'
import './message.css'

const Message = (props) => {
  const message = props.data
  const date = new Date(message.date)
  let minutes = date.getMinutes()
  minutes = minutes < 10 ? '0' + minutes : minutes

  const [, month, day] = date.toDateString().split(' ')
  const classeNames = 'msg-month-day-div' + (props.showMonth
    ? ''
    : ' msg-hide')

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
        src={src}
      />
    )
  }

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
        <span className='msg-username'>
          {message.username}:
        </span>
        <span className='msg-content'>
          {isVideo && videoPlayer()}
          {!isVideo && message.content}
        </span>
      </div>
    </div>
  )
}

export default Message
