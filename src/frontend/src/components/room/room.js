import React, {
  useState,
  useEffect
} from 'react'

import {
  useHistory
} from 'react-router-dom'

import { connect } from 'react-redux'

import {
  Container,
  Row,
  Col
} from 'reactstrap'

import io from 'socket.io-client'
import { getSecure } from '../apiUtils/apiUtils'

import './room.css'

import Header from '../header/header'
import Message from '../message/message'
import ShowUsers from '../showUsers/showUsers'
import TextInput from '../textInput/textInput'

const Room = (props) => {
  const history = useHistory()
  const [initialized, setInitialized] = useState(false)
  const [content, setContent] = useState([])

  const connectToRoom = () => {
    const token = window.localStorage.token
    const url = `${props.config.urlBase}?token=${token}`
    const socket = io.connect(url)

    socket.on('connect', () => {
      console.log('CONNECTED!!')
      socket.emit('newUser', {
        username: props.currentUser.username
      })
      setInitialized(true)
    })

    socket.on('newMessage', (msg) => {
      console.log('New message: ', msg)
      setContent(content => [...content, msg])
    })
  }

  const getMessages = () => {
    const url = `${props.config.urlBase}${props.config.message}`
    getSecure(url)
      .then(res => {
        console.log({ res })
        res.data.reverse()
        setContent(content => res.data)
      })
  }

  useEffect(() => {
    if (!window.localStorage.token) {
      history.push('/login')
    }

    if (!initialized) {
      getMessages()
      connectToRoom()
    }
  }, [initialized, props])

  const renderContent = () => {
    return content.map((msg, ind) => {
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
      <Header />
      <Row className='main'>
        <Col className='room-content'>
          {renderContent()}
        </Col>
        <Col sm='2'>
          <ShowUsers
            data={[]}
          />
        </Col>
      </Row>
      <Row>
        <Col className='input-text'>
          <TextInput
            placeholder='Say hello!'
            {...props}
          />
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

export default connect(mapStateToProps, null)(Room)
