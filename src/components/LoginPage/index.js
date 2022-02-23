import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({showErrorMsg: true, errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="login-card" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input"
            value={username}
            onChange={this.onChangeUsername}
            placeholder="Username"
          />
          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input"
            value={password}
            onChange={this.onChangePassword}
            placeholder="Password"
          />
          <button className="login-button" type="submit">
            Login
          </button>
          {showErrorMsg && <p className="error">{`*${errorMsg}`}</p>}
        </form>
      </div>
    )
  }
}

export default LoginPage
