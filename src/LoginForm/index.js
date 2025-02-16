import React, {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure(errorMsg) {
    this.setState({
      errorMsg,
      showError: true,
    })
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const obj = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(obj),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    return (
      <div className="loginform-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo-image"
          />
          <form className="login-form" onSubmit={this.submitLoginForm}>
            <label htmlFor="username" className="login-label">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              name="username"
              id="username"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={this.handleInputChange}
            />
            <br />
            <label htmlFor="password" className="login-label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={this.handleInputChange}
            />
            <br />
            <div className="login-button-container">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
            {showError && <p className="error-message">{errorMsg}</p>}
            <h3 className="login-label">Use this credentials</h3>
            <p className="login-label">username: rahul</p>
            <p className="login-label">password: rahul@2021</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
