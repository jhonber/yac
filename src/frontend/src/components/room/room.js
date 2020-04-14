import React, {
  useState,
  useEffect
} from 'react'

import {
  useHistory
} from 'react-router-dom'

import { connect } from 'react-redux'
import { currectUser } from '../redux/actions/users'

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
  const [connectedUsers, setConnectedUser] = useState(0)

  const connectToRoom = () => {
    const token = window.localStorage.token
    const url = `${props.config.urlBase}?token=${token}`
    const socket = io.connect(url)

    socket.on('connect', () => {
      socket.emit('newUser', {
        username: props.currentUser.username || window.localStorage.username
      })
      setInitialized(true)
    })

    socket.on('newMessage', msg => {
      console.log('New message: ', msg)
      setContent(content => [...content, msg])
      scrollDown()
    })

    socket.on('newUser', data => {
      // TODO:
      // show status about new connected user
      console.log('new user:', data)
      setConnectedUser(connectedUsers => data.allUsers)
    })

    socket.on('leftUser', data => {
      console.log('user left: ', data)
      setConnectedUser(connectedUsers => data.allUsers)
    })
  }

  const getMessages = () => {
    const url = `${props.config.urlBase}${props.config.message}`
    getSecure(url)
      .then(res => {
        res.data.reverse()
        setContent(content => res.data)
        scrollDown()
      })
  }

  const validateUser = () => {
    const url = `${props.config.urlBase}${props.config.validateUser}`
    getSecure(url)
      .then(res => {
        if (res.ok) {
          console.log('USER: ', res.user)
          props.currectUser(res.user)
        }
      })
      .catch(err => {
        console.log('Validation error: ', err)
        history.push('/login')
      })
  }

  const scrollDown = () => {
    const ele = document.getElementsByClassName('room-content')[0]
    const len = ele.childNodes.length
    if (len > 0) {
      ele.childNodes[len - 1].scrollIntoView()
    }
  }

  useEffect(() => {
    validateUser()

    if (!initialized) {
      getMessages()
      connectToRoom()
    }
  }, [])

  const renderContent = () => {
    return content.map((msg, ind) => {
      return (
        <Message
          key={msg.date + ind}
          data={msg}
          showMonth={(ind % 5) === 0}
          {...props}
        />
      )
    })
  }

  return (
    <div className='room'>
      <Header />
      <div className='room-row'>
        <div className='room-content room-col-3'>
          {renderContent()}
        </div>
        <div className='room-users room-col-1'>
          <ShowUsers
            data={connectedUsers}
          />
        </div>
        <div className='input-text room-col-3'>
          <TextInput
            placeholder='Say hello!'
            {...props}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

const mapDispatchToProps = (dispatch) => ({
  currectUser: (user) => dispatch(currectUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Room)
