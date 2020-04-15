import React, {
  useState
} from 'react'

import {
  useHistory
} from 'react-router-dom'

import {
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  Jumbotron
} from 'reactstrap'

import '../login/login.css'
import Header from '../header/header'
import { post } from '../apiUtils/apiUtils'

const Signup = (props) => {
  const history = useHistory()
  const [username, setUsername] = useState('jhon')
  const [email, setEmail] = useState('jhon@gmail.com')
  const [password, setPassword] = useState('1234')
  const [password2, setPassword2] = useState('1234')

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handlePassword2 = (event) => {
    setPassword2(event.target.value)
  }

  const handleSubmit = () => {
    const url = `${props.config.urlBase}${props.config.signup}`
    const data = {
      username: username,
      email: email,
      password: password,
      password2: password2
    }

    post(url, data)
      .then(res => {
        if (res) {
          if (res.ok) {
            window.alert('Successfully registered.')
            history.push('/login')
          } else {
            window.alert(res.msg)
          }
        } else {
          window.alert('Something went wrong!')
        }
      })
      .catch(err => console.log({ err }))
  }

  return (
    <div>
      <Header />
      <div className='login-main'>
        <Jumbotron className='login-form'>
          <h3>Sign up</h3>
          <Form>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type='text'
                name='username'
                value={username}
                onChange={handleUsername}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type='text'
                name='email'
                value={email}
                onChange={handleEmail}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type='password'
                name='password'
                value={password}
                onChange={handlePassword}
              />
            </FormGroup>
            <FormGroup>
              <Label>Confirmation</Label>
              <Input
                type='password'
                name='password2'
                value={password2}
                onChange={handlePassword2}
              />
            </FormGroup>
            <Button
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          </Form>
        </Jumbotron>
      </div>
    </div>
  )
}

export default Signup
