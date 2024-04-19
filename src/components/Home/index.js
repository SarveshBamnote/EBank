import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="home-container">
      <div className="header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <button className="logout-button" onClick={onClickLogout} type="button">
          Logout
        </button>
      </div>
      <h1 className="main-heading">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="digital-card-image"
      />
    </div>
  )
}

export default Home
