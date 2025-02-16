import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import JobsCardItem from '../JobsCardItem'
import Header from '../Header'
import './index.css'

const changeStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

class Jobs extends Component {
  state = {
    status: changeStatus.initial,
    cardData: [],
    searchInputValue: '',
    searchValue: '',
    filterList: [],
    employmentTypeIds: [],
    salary: '',
    profileCardDetails: null,
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileCard()
  }

  filterBasedOnCheckbox = event => {
    const {employmentTypeIds} = this.state
    const {id, checked} = event.target

    if (checked) {
      this.setState(
        prevState => ({
          employmentTypeIds: [...prevState.employmentTypeIds, id],
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        prevState => ({
          employmentTypeIds: prevState.employmentTypeIds.filter(
            typeId => typeId !== id,
          ),
        }),
        this.getJobs,
      )
    }
  }

  searchFilter = event => {
    this.setState({searchInputValue: event.target.value})
  }

  updateRadio = event => {
    const {id} = event.target
    this.setState({salary: id}, this.getJobs)
  }

  getJobs = async () => {
    const {employmentTypeIds, salary, searchValue} = this.state
    this.setState({status: changeStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const employmentTypeQuery = employmentTypeIds.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${salary}&search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const {jobs} = await response.json()
      const formattedData = jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        status: changeStatus.success,
        cardData: formattedData,
        filterList: formattedData,
      })
    } else {
      this.setState({status: changeStatus.failure})
    }
  }

  searchClickButton = () => {
    const {searchInputValue} = this.state
    this.setState({searchValue: searchInputValue}, this.getJobs)
  }

  getProfileCard = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json()
      const {profile_details: profileDetails} = data // Rename while destructuring

      const profileCardDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({profileCardDetails})
    } else {
      this.setState({profileCardDetails: null})
    }
  }

  renderProfileCard = () => {
    const {profileCardDetails} = this.state
    if (!profileCardDetails) {
      return (
        <button className="retryButton" onClick={this.getProfileCard}>
          Retry
        </button>
      )
    }
    const {name, profileImageUrl, shortBio} = profileCardDetails
    return (
      <>
        <img src={profileImageUrl} alt="profile" />
        <h1 className="left-card-heading">Venkat Reddy</h1>
        <p className="left-card-para">{shortBio}</p>
      </>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {filterList, employmentTypeIds, salary, searchInputValue} = this.state
    const booolenaValue = filterList.length > 0
    return (
      <div className="jobs-division-container">
        <div className="left-container">
          <div className="left-container-card">{this.renderProfileCard()}</div>
          <hr className="horizontal-line" />
          <h1 className="left-container-heading">Type of Employment</h1>
          <ul className="checkbox-list">
            {employmentTypesList.map(eachItem => (
              <div
                className="checkbox-label-container"
                key={eachItem.employmentTypeId}
              >
                <div className="leftContainer-margin">
                  <input
                    type="checkbox"
                    id={eachItem.employmentTypeId}
                    className="left-container-checkbox"
                    onChange={this.filterBasedOnCheckbox}
                    checked={employmentTypeIds.includes(
                      eachItem.employmentTypeId,
                    )}
                  />
                  <label
                    htmlFor={eachItem.employmentTypeId}
                    className="jobs-leftContainer-label"
                  >
                    {eachItem.label}
                  </label>
                </div>
              </div>
            ))}
          </ul>
          <hr className="horizontal-line" />
          <h1 className="left-container-heading">Salary Range</h1>
          <ul className="checkbox-list">
            {salaryRangesList.map(eachItem => (
              <div
                className="checkbox-label-container"
                key={eachItem.salaryRangeId}
              >
                <div className="leftContainer-margin">
                  <input
                    type="radio"
                    id={eachItem.salaryRangeId}
                    className="left-container-checkbox"
                    name="salary"
                    onChange={this.updateRadio}
                    checked={salary === eachItem.salaryRangeId}
                  />
                  <label
                    htmlFor={eachItem.salaryRangeId}
                    className="jobs-leftContainer-label"
                  >
                    {eachItem.label}
                  </label>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="right-container">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              className="right-search-input"
              onChange={this.searchFilter}
              value={searchInputValue}
            />
            <button
              aria-label="Submit"
              data-testid="searchButton"
              className="searchiconButton"
              onClick={this.searchClickButton}
            >
              <FaSearch className="rigth-container-searchIcon" />
            </button>
          </div>
          <ul>
            {booolenaValue ? (
              filterList.map(eachItem => (
                <JobsCardItem key={eachItem.id} item={eachItem} />
              ))
            ) : (
              <div className="no-products-alignment">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                  className="noJobs"
                />
                <h1 className="no-produts-found-heading">No Jobs Found</h1>
                <p className="no-produts-found-para">
                  We could not find any jobs. Try other filters.
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-message">
        Oops! Something Went Wrong. Please try again.
      </h1>
      <button className="retryButton" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

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
        <div className="jobs-main-container">{this.getSwitchStatus()}</div>
      </>
    )
  }
}

export default Jobs
