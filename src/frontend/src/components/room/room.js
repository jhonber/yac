import React, {
  useState,
  useEffect
} from 'react'

import {
  useHistory
} from 'react-router-dom'

import { connect } from 'react-redux'
import { currectUser } from '../redux/actions/users'

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
  const [socketReady, setSocketReady] = useState(null)

  const connectToRoom = () => {
    const token = window.localStorage.token
    const url = `${props.config.urlBase}?token=${token}`
    const socket = io.connect(url)

    socket.on('connect', () => {
      setSocketReady(socketReady => socket)
      socket.emit('newUser', {
        username: props.currentUser.username ||
          window.localStorage.username
      })
    })

    socket.on('newMessage', msg => {
      setContent(content => [...content, msg])
      scrollDown()
    })

    socket.on('newUser', data => {
      const msg = {
        username: '',
        date: new Date(),
        content: data.user.username + ' joined',
        color: ''
      }
      setContent(content => [...content, msg])
      scrollDown()
      setConnectedUser(connectedUsers => data.allUsers)
    })

    socket.on('leftUser', data => {
      const msg = {
        username: '',
        date: new Date(),
        content: data.user.username + ' left',
        color: ''
      }
      setContent(content => [...content, msg])
      scrollDown()
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
          props.currectUser(res.user)
          setInitialized(true)
        }
      })
      .catch(err => {
        console.log('Validation error: ', err)
        history.push('/login')
      })
  }

  const scrollDown = () => {
    let ele = document.getElementsByClassName('room-content')
    if (ele.length === 0) return

    ele = ele[0]
    if (ele.childNodes &&
      ele.childNodes.length > 0) {
      const len = ele.childNodes.length
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

  const renderRoom = () => {
    return (
      <div className='room'>
        {socketReady && <Header socket={socketReady} />}
        <div className='room-row'>
          <div className='room-content room-col-4'>
            {renderContent()}
          </div>
          <div className='room-users room-col-0'>
            <ShowUsers
              data={connectedUsers}
            />
          </div>
          <div className='input-text room-col-4'>
            <TextInput
              placeholder='Say hello!'
              {...props}
            />
          </div>
        </div>
      </div>
    )
  }

  const view = initialized ? renderRoom() : null
  return view
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
