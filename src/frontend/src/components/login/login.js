import React, {
  useState
} from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { currectUser } from '../redux/actions/users'

import {
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  Jumbotron
} from 'reactstrap'

import './login.css'

import Header from '../header/header'
import { post } from '../apiUtils/apiUtils'

export const Login = (props) => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = () => {
    const url = `${props.config.urlBase}${props.config.login}`
    const data = {
      email: email,
      password: password
    }

    post(url, data)
      .then(res => {
        if (res) {
          if (res.ok) {
            window.localStorage.token = res.token
            window.localStorage.username = res.user.username
            props.currectUser(res.user)
            history.push('/')
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
    <div className='login-main'>
      <Header />
      <div>
        <Jumbotron className='login-form'>
          <h3>Login</h3>
          <Form>
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
            <Button
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>
        </Jumbotron>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  currectUser: (user) => dispatch(currectUser(user))
})

export default connect(null, mapDispatchToProps)(Login)
