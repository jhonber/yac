module.exports = {
  get: (url) => {
    const req = new window.Request(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    return window.fetch(req)
      .then(res => res.json())
  },
  post: (url, data) => {
    const req = new window.Request(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log({ req })

    return window.fetch(req)
      .then(res => res.json())
      .catch(err => err)
  },
  getSecure: (url) => {
    const req = new window.Request(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.token
      }
    })

    return window.fetch(req)
      .then(res => res.json())
      .catch(err => err)
  },
  postSecure: (url, data) => {
    const req = new window.Request(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.token
      },
      body: JSON.stringify(data)
    })

    return window.fetch(req)
      .then(res => res.json())
      .catch(err => err)
  }
}
