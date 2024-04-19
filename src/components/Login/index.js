import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userIdInput: '',
    pinInput: '',
    showErrMsg: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userIdInput: event.target.value})
  }

  onChangePin = event => {
    this.setState({pinInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrMsg: true, errorMsg})
  }

  onSubmitLogin = async event => {
    event.preventDefault()

    let {userIdInput, pinInput} = this.state

    if (userIdInput === '123456') userIdInput = '142420'
    if (pinInput === '123456') pinInput = '231225'

    const userDetails = {user_id: userIdInput, pin: pinInput}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrMsg, errorMsg} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login-image"
            />
          </div>

          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <h1 className="heading">Welcome Back!</h1>

            <label className="label" htmlFor="userId">
              User ID
            </label>
            <input
              className="input"
              onChange={this.onChangeUserId}
              id="userId"
              type="text"
              placeholder="Enter User ID : 123456"
            />

            <label className="label" htmlFor="pin">
              PIN
            </label>
            <input
              className="input"
              onChange={this.onChangePin}
              id="pin"
              type="password"
              placeholder="Enter PIN : 123456"
            />

            <button className="login-button" type="submit">
              Login
            </button>

            {showErrMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
