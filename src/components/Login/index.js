import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isErrorMsgShown: false,
    errorMsg: '',
  }

  onChangeUserName = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isErrorMsgShown: true, errorMsg})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isErrorMsgShown, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="website-login-bg-container">
        <img
          src="https://res.cloudinary.com/dqfyurtdb/image/upload/v1685954626/Rectangle_1457login_w2tbce.png"
          alt="website log0"
          className="website-login-image-mobile-view"
        />
        <div className="form-bg-container">
          <form className="form-container" onSubmit={this.onFormSubmit}>
            <img
              src="https://res.cloudinary.com/dqfyurtdb/image/upload/v1686064158/Frame_274_v0twde.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="website-title">Tasty Kitchens</h1>
            <h1 className="login-heading">Login</h1>
            <div className="input-container">
              <label htmlFor="USERNAME" className="label">
                username
              </label>
              <input
                type="text"
                id="USERNAME"
                className="input-field"
                onChange={this.onChangeUserName}
                value={username}
              />
            </div>
            <div className="input-container">
              <label htmlFor="PASSWORD" className="label">
                password
              </label>
              <input
                type="password"
                id="PASSWORD"
                className="input-field"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            {isErrorMsgShown && <p className="error-msg">*{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dqfyurtdb/image/upload/v1685959599/Rectangle_1456_d2tpl8.png"
          alt="website login"
          className="website-login-image-tablet-view"
        />
      </div>
    )
  }
}

export default Login
