import React, {
  useState
} from 'react'

import {
  Input
} from 'reactstrap'

import {
  get,
  postSecure
} from '../apiUtils/apiUtils'

const TextInput = (props) => {
  const url = `${props.config.urlBase}${props.config.message}`
  const youtubeCmd = props.config.youtubeCmd
  const [text, setText] = useState('')
  const [placeholder, setPlaceholder] = useState(props.placeholder)

  const handleText = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = (event) => {
    if (event.key === 'Enter') {
      if (text.indexOf(youtubeCmd) === 0) {
        const q = text.split(youtubeCmd)[1]
        const urlYoutube = `${props.config.youtube}` +
          `${props.config.youtubeParams}&q=${q}` +
          `&key=${props.config.youtubeApiKey}`

        get(urlYoutube).then(res => {
          if (res.items && res.items.length > 0) {
            const videoId = res.items[0].id.videoId
            makeRequest(youtubeCmd + videoId)
          }
        })
      } else {
        makeRequest(text)
      }
    }

    function makeRequest (val) {
      const data = { content: val }
      postSecure(url, data)
        .then(res => {
          setText('')
          setPlaceholder('')
          console.log({ res })
          if (!res.ok) {
            console.log('Error: ', res.msg)
          }
        })
    }
  }

  return (
    <Input
      placeholder={placeholder}
      type='text'
      value={text}
      onChange={handleText}
      onKeyDown={handleSubmit}
    />
  )
}

export default TextInput
