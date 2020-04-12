import React,
{ useState } from 'react'
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

const Signup = () => {
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
    const url = `${CONFIG.urlBase}${CONFIG.signup}`
    console.log({ url })
    const data = {
      username: username,
      email: email,
      password: password,
      password2: password2
    }
    console.log({ data })

    post(url, data)
      .then(res => {
        console.log({ res })
        if (res) {
          if (res.ok) {
            // TODO:
            // - redirect to login page
            window.alert('Successfully registered.')
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
            <h2>Sign up</h2>
            <Form>
              <FormGroup>
                <Label>Username</Label>
                <Input type='text' name='username' value={username} onChange={handleUsername} />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input type='text' name='email' value={email} onChange={handleEmail} />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type='password' name='password' value={password} onChange={handlePassword} />
              </FormGroup>
              <FormGroup>
                <Label>Confirmation</Label>
                <Input type='password' name='password2' value={password2} onChange={handlePassword2} />
              </FormGroup>
              <Button onClick={handleSubmit}>Sign up</Button>
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup
