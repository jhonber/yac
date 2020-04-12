import React, {
  useState
} from 'react'

import {
  Container,
  Row,
  Col
} from 'reactstrap'

import './room.css'

import Message from '../message/message'
import ShowUsers from '../showUsers/showUsers'
import TextInput from '../textInput/textInput'

const Room = () => {
  const dummy = [
    {
      username: 'jhon',
      text: 'Hello there',
      date: '2020-04-12T16:20:45.324Z'
    },
    {
      username: 'andres',
      text: 'Hi!',
      date: '2020-04-12T16:10:45.324Z'
    },
    {
      username: 'jhon',
      text: 'Hello there',
      date: '2020-04-12T16:20:45.324Z'
    },
    {
      username: 'andres',
      text: 'Hi!',
      date: '2020-04-12T16:10:45.324Z'
    }
  ]

  const [content, setContent] = useState(dummy)

  const renderContent = () => {
    return content.map((msg, ind) => {
      console.log({ msg })
      return (
        <Message
          key={msg.date + ind}
          data={msg}
        />
      )
    })
  }

  return (
    <Container className='themed-container room' fluid='sm'>
      <Row className='main'>
        <Col className='room-content'>
          {renderContent()}
        </Col>
        <Col sm='2'>
          <ShowUsers
            data={dummy}
          />
        </Col>
      </Row>
      <Row>
        <Col className='input-text'>
          <TextInput
            placeholder='Say hello!'
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Room
