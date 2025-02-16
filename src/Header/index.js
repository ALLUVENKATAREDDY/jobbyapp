import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutFunction = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div>
      {/* Mobile Navbar */}
      <div className="header-container mobile-container">
        <Link to="/" className="header-link">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-logo-image"
            />
          </div>
        </Link>
        <ul className="nav-headings-container list-style">
          <Link to="/" className="header-link">
            <li>
              <AiFillHome className="mobile-icons" />
            </li>
          </Link>
          <Link to="/jobs" className="header-link">
            <li>
              <BsFillBriefcaseFill className="mobile-icons" />
            </li>
          </Link>
        </ul>
        <ul className="logoutButton-Container list-style">
          <li>
            <button
              aria-label="Submit"
              type="button"
              className="logoutButton"
              onClick={logoutFunction}
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
      </div>

      {/* Desktop Navbar */}
      <div className="header-container large-container">
        <Link to="/" className="header-link">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-logo-image"
            />
          </div>
        </Link>
        <ul className="nav-headings-container list-style">
          <Link to="/" className="header-link">
            <li>
              <h1 className="nav-heading">Home</h1>
            </li>
          </Link>
          <Link to="/jobs" className="header-link">
            <li>
              <h1 className="nav-heading">Jobs</h1>
            </li>
          </Link>
        </ul>
        <ul className="logoutButton-Container list-style">
          <li>
            <button
              type="button"
              className="logoutButton"
              onClick={logoutFunction}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)
