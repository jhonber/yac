import React from 'react'

const YoutubePlayer = (props) => {
  return (
    <iframe
      className='videoPlayer'
      title={props.videoId}
      width='300'
      height='150'
      allowFullScreen
      mozallowfullscreen='mozallowfullscreen'
      msallowfullscreen='msallowfullscreen'
      oallowfullscreen='oallowfullscreen'
      webkitallowfullscreen='webkitallowfullscreen'
      src={props.src}
    />
  )
}

export default YoutubePlayer
