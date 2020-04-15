## YAC

Yet Another Chat

### Must features

- [x] login (could be just login by nickname or full signup process your choice)
- [x] like IRC on one chat room
- [x] cant be 2 people with same nickname
- [x] chat room with the whole history
- [x] an input to type messages
- [x] message must be appended to the chat of all participants
- [x] messages must show the sender and time
- [x] Integrage the text input with a Youtube Bot. The goal is to type a message inside text input with the followling format:
    - text format: /youtube any_string
        - must query youtube search api with any_string
        - take the first value of the search
        - append a mes

### Additional features
- Use token to manage login and authentication of sockets
- RESTful api
- Show connected users
- Show events join/left from users
- Allow multiple connections with same user
- Responsive for different screen sizes
- Added custom favicon
- Basic test for login component and end point /api/login

### Backend stack
- Nodejs: Expressjs
- MongoDB: Mongoose
- Other packages: Passport, Socket.io

### Frontend stack
- Reactjs: CRA
- Redux
- Other packages: React-router, Reactstrap, Socket.io-client

### Style guide
- [JavaScript Standard Style](https://standardjs.com/)

### API doc

| url         | method   | description         | params |
| ------------| -------- | ------------------- | -------|
| api/signup  | POST     | creates a new user   | <ul> <li> username </li> <li> email </li> <li> password </li><li> password2 </li> </ul> |
| api/login   | POST     | allow authentication of users  | <ul> <li> email </li> <li> password </li> </ul>|
| api/validate| POST     | allow validation of token | <ul> <li> Authorization: 'Bearer [token]' </li> </ul>|
| api/message | POST     | creates a new message | <ul> <li> content </li> <li> Authorization: 'Bearer [token]' </li> </ul>|
| api/message | GET      | returns last 10 messages | <ul> <li> content </li> <li> Authorization: 'Bearer [token]' </li> </ul>|

### Sockets events

- connection
- newUser
- newMessage
- leftUser
- disconnect

### Tests
#### frontend

Snapshot test for login component: expect match with previous snaptshot

```
    $ cd src/frontend
    $ npm run test
```

#### backend
Test endpoint _POST /api/login_: expect successful login with response

```javascript
    {
      ok: true,
      token: '<TOKEN_STRING>',
      user: { username: 'test', email: 'test@test.com' }
    }

```

```
    $ cd src/frontend
    $ npm run test
```

#### Deploy
- [mLab](https://mlab.com/): Use Mongo free sandbox 0.5GB
- [Heroku](http://heroku.com/): Use free plan to hosting front/back



