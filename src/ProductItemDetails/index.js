import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const changeStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProductItem extends Component {
  state = {topData: [], similarJobsData: [], status: changeStatus.initial}

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({status: changeStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    if (response.ok === true) {
      const data = await response.json()
      const {job_details: jobDetails, similar_jobs: similarJobs} = data

      const formattedSimilarJobs = similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const {life_at_company: lifeAtCompany, skills} = jobDetails

      const lifeAtCompanyData = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      const skillsData = skills.map(eachItem => ({
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      const formattedData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: lifeAtCompanyData,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: skillsData,
        title: jobDetails.title,
      }

      this.setState({
        topData: formattedData,
        similarJobsData: formattedSimilarJobs,
        status: changeStatus.success,
      })
    } else {
      this.setState({status: changeStatus.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryFunction = () => {
    this.getProductItemDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-message">Oops! Something Went Wrong</h1>
      <p className="failure-message">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.retryFunction}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {topData, similarJobsData} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = topData

    return (
      <div>
        <div className="align-centering">
          <div className="cardItemDetails ">
            <div className="topContainer">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt="job details company logo"
              />
              <div className="margin-top">
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
                <div className="space-between">
                  <h1 className="description">Description</h1>
                  <a href={companyWebsiteUrl} className="alignment">
                    <p>Visit </p> <FaExternalLinkAlt className="link-icon" />
                  </a>
                </div>
                <p className="job-description fontSize">{jobDescription}</p>
              </div>
              <h1 className="description skills-margin">Skills</h1>
              <ul className="skills-container">
                {skills.map(eachItem => (
                  <li className="skills-item" key={eachItem.name}>
                    <img
                      src={eachItem.imageUrl}
                      alt={eachItem.name}
                      className="skills-image"
                    />
                    <h1 className="description">{eachItem.name}</h1>
                  </li>
                ))}
              </ul>
              <h1 className="description skills-margin">Life at Company</h1>
              <div className="bottom-container">
                <p className="lifeAtCompanydescription">
                  {lifeAtCompany.description}
                </p>
                <img
                  src={lifeAtCompany.imageUrl}
                  alt="life at company"
                  className="lifeAtCompanyImage"
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className="similarJobsHeading">Similar Jobs</h1>
        <ul className="SimilarJobsContanier">
          {similarJobsData.map(eachItem => (
            <li className="similar-job-card" key={eachItem.id}>
              <div className="topContainer">
                <img
                  src={eachItem.companyLogoUrl}
                  className="similarJoblogo"
                  alt="similar job company logo"
                />
                <div className="similarJob-margin-top">
                  <h1 className="job-title">{eachItem.title}</h1>
                  <p className="job-rating">
                    <AiFillStar className="star" /> {eachItem.rating}
                  </p>
                </div>
              </div>
              <h1 className="description">Description</h1>
              <p className="similarJobDescription">{eachItem.jobDescription}</p>
              <div className="space-between">
                <div className="map-job-container">
                  <p className="job-location">
                    <MdLocationOn className="map-icon" />
                    {eachItem.location}
                  </p>
                  <p className="job-location margin-top">
                    <BsFillBriefcaseFill className="map-icon" />{' '}
                    {eachItem.employmentType}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  getSwitchStatus = () => {
    const {status} = this.state
    switch (status) {
      case changeStatus.loading:
        return this.renderLoading()
      case changeStatus.success:
        return this.renderSuccessView()
      case changeStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="ProductItemDetailsCard">{this.getSwitchStatus()}</div>
      </>
    )
  }
}

export default ProductItem
