import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Route {...props} />
  }
  return <Redirect to="/login" />
}

export default ProtectedRoute
