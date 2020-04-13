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
  Jumbotron,
  Container,
  Row,
  Col
} from 'reactstrap'

import { post } from '../apiUtils/apiUtils'
import config from '../../config.json'
const env = config.env
const CONFIG = config[env]

const Login = (props) => {
  const history = useHistory()
  const [email, setEmail] = useState('jhon2@gmail.com')
  const [password, setPassword] = useState('1234')

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = () => {
    const url = `${CONFIG.urlBase}${CONFIG.login}`
    console.log({ url })
    const data = {
      email: email,
      password: password
    }
    console.log({ data })

    post(url, data)
      .then(res => {
        console.log({ res })
        if (res) {
          if (res.ok) {
            window.localStorage.token = res.token
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
    <Container>
      <Row>
        <Col md={{ size: 4, offset: 4 }}>
          <Jumbotron>
            <h2>Login</h2>
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
        </Col>
      </Row>
    </Container>
  )
}

const mapDispatchToProps = (dispatch) => ({
  currectUser: (user) => dispatch(currectUser(user))
})

export default connect(null, mapDispatchToProps)(Login)
