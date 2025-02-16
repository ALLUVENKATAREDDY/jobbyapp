import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobsCardItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = item

  return (
    <Link to={`/jobs/${id}`} className="link-card-item">
      <li className="jobs-card">
        <div className="cardLogo-star-container">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
          </div>
          <div className="company-rating-container">
            <h1 className="job-title">{title}</h1>
            <p className="job-rating">
              <AiFillStar className="star" /> {rating}
            </p>
          </div>
        </div>
        <div>
          <div className="space-between">
            <div className="map-job-container">
              <p className="job-location">
                <MdLocationOn className="map-icon" />
                {location}
              </p>
              <p className="job-location margin-top">
                <BsFillBriefcaseFill className="map-icon" />
                {employmentType}
              </p>
            </div>
            <div className="job-meta">
              <p className="job-package white-color">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="job-details-container">
            <h1 className="description">Description</h1>
            <p className="job-description">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobsCardItem
