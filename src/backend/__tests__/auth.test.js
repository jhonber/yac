const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)

/* eslint-disable */
describe('POST /users', () => {
  it ('login failed', () => {
    const data = {
      email: 'test@test.com',
      password: '1234'
    }

    const expData = {
      username: 'test',
      email: 'test@test.com'
    }

    return request
      .post('/api/login')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const resData = res.body

        expect(resData.ok).toBe(true)
        expect(typeof resData.token).toBe('string')
        expect(resData.user).toStrictEqual(expData)
      })
  })
})
