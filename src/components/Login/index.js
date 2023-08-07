import {Component} from 'react'

// import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameContainer = () => {
    const {username} = this.state
    return (
      <div className="inputs-container">
        <label htmlFor="username" className="label">
          Username*
        </label>
        <br />
        <input
          type="text"
          id="username"
          value={username}
          className="input-element"
          placeholder="ex-Harish"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordContainer = () => {
    const {password} = this.state
    return (
      <div className="inputs-container">
        <label className="label" htmlFor="password">
          Password*
        </label>
        <br />
        <input
          type="password"
          className="input-element"
          value={password}
          onChange={this.onChangePassword}
          placeholder="enter password"
        />
      </div>
    )
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(loginUrl, options)
    const data = response.json()
    if (response.ok) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state

    // const jwtToken = Cookies.get('jwt_token')
    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />
    // }
    return (
      <div className="login-responsive-container">
        <div className="login-page-left-side-container">
          <img
            src="https://res.cloudinary.com/dovk61e0h/image/upload/v1662988550/Bookhub/Rectangle_1467_wzhge6_ykftzx.png"
            className="login-page-image"
            alt="website login"
          />
        </div>
        <div className="login-page-right-side-container">
          <div className="login-card">
            <img
              src="https://res.cloudinary.com/dovk61e0h/image/upload/v1662988538/Bookhub/bookhub_logo_hjkrwl.png"
              alt="loginwebsiteimage"
              className="login-website-logo"
            />
            <form className="form-container" onSubmit={this.onSubmitForm}>
              {this.renderUsernameContainer()}
              {this.renderPasswordContainer()}
              {showErrorMsg ? (
                <p className="error-message">{errorMsg}</p>
              ) : null}
              <button className="submit-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
