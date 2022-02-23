import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    history.replace('/login')

    Cookies.remove('jwt_token')
  }

  return (
    <nav className="nav-bar">
      <div className="nav-desktop">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo-mobile"
          />
        </Link>
        <ul className="nav-options">
          <Link to="/" className="nav-option-mobile">
            <li className="option">Home</li>
          </Link>
          <Link to="/jobs" className="nav-option-mobile">
            <li className="option">Jobs</li>
          </Link>
        </ul>
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="nav-mobile">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo-mobile"
          />
        </Link>
        <ul className="nav-options">
          <Link to="/" className="nav-option-mobile">
            <li>
              <AiFillHome className="icon" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-option-mobile">
            <li>
              <FaSuitcase className="icon" />
            </li>
          </Link>
          <li>
            <FiLogOut className="icon" onClick={onClickLogout} />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
