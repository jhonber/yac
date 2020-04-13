import React, {
  useState
} from 'react'

import {
  Input
} from 'reactstrap'

import { postSecure } from '../apiUtils/apiUtils'

const TextInput = (props) => {
  const url = `${props.config.urlBase}${props.config.message}`
  const [text, setText] = useState('')
  const [placeholder, setPlaceholder] = useState(props.placeholder)

  const handleText = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = (event) => {
    if (event.key === 'Enter') {
      postSecure(url, { content: text })
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
