import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-content">
          Millions of people are searching for jobs,salary,information,company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="link-button">
          <button className="home-button">Find Jobs</button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
