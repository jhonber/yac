import React, {
  useState
} from 'react'

import {
  Input
} from 'reactstrap'

const TextInput = (props) => {
  const [text, setText] = useState('')

  const handleText = (event) => {
    setText(event.target.value)
  }

  return (
    <Input
      placeholder={props.placeholder}
      type='text'
      value={text}
      onChange={handleText}
    />
  )
}

export default TextInput
