import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    isProfileLoading: true,
    profileDetails: '',
    selectedRadioButton: '',
    employmentType: [],
    jobs: [],
    apiStatus: 'Loading',
  }

  componentDidMount() {
    this.renderProfileDetails()
    this.renderJobs()
  }

  retryJobs = () => {
    this.renderJobs()
  }

  renderJobsContainer = () => {
    const {jobs, searchInput, apiStatus} = this.state
    switch (apiStatus) {
      case 'Loading':
        return (
          <div testid="loader" className="loader-container">
            <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
          </div>
        )
      case 'Success':
        return (
          <ul className="jobs-container">
            <div className="search-container large">
              <input
                type="search"
                placeholder="Search"
                className="sort-search-bar"
                onChange={this.onSearch}
                value={searchInput}
              />
              <button
                testid="searchButton"
                onClick={this.onClickSearch}
                type="button"
                className="search-button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="ul">
              {jobs.map(eachItem => (
                <Link to={`/jobs/${eachItem.id}`} className="link-item">
                  <li className="job-item" key={eachItem.id}>
                    <div className="job-item-image-title-rating-container">
                      <img
                        alt="company logo"
                        src={eachItem.company_logo_url}
                        className="job-item-image"
                      />
                      <div className="job-item-title-rating-container">
                        <h1 className="job-item-title">{eachItem.title}</h1>
                        <div className="rating-container">
                          <AiFillStar className="star-icon" />
                          <p className="rating">{eachItem.rating}</p>
                        </div>
                      </div>
                    </div>
                    <div className="job-item-location-type-package-container">
                      <ul className="job-location-type-container">
                        <li className="job-location-type-container">
                          <MdLocationOn className="location" />
                          <p className="location-name">{eachItem.location}</p>
                        </li>
                        <li className="job-location-type-container">
                          <FaSuitcase className="location" />
                          <p className="location-name">
                            {eachItem.employment_type}
                          </p>
                        </li>
                      </ul>
                      <p className="salary">{eachItem.package_per_annum}</p>
                    </div>
                    <hr className="line1" />
                    <h1 className="job-description-heading">Description</h1>
                    <p className="job-description">
                      {eachItem.job_description}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          </ul>
        )
      case 'Failure':
        return (
          <div className="no-jobs-found">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="no-jobs-found"
            />
            <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
            <p className="no-jobs-description">
              We cannot seem to find the page you are looking for
            </p>
            <button type="button" className="retry" onClick={this.retryJobs}>
              Retry
            </button>
          </div>
        )

      default:
        return (
          <div className="no-jobs-found-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-found"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-description">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )
    }
  }

  renderJobs = async () => {
    const {employmentType, selectedRadioButton, searchInput} = this.state
    const token = Cookies.get('jwt_token')
    const employmentOptions = employmentType.toString()
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentOptions}&minimum_package=${selectedRadioButton}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      if (data.jobs.length !== 0) {
        this.setState(
          {apiStatus: 'Success', jobs: data.jobs},
          this.renderJobsContainer,
        )
      } else {
        this.setState(
          {apiStatus: '', jobs: data.jobs},
          this.renderJobsContainer,
        )
      }
    } else {
      this.setState({apiStatus: 'Failure'}, this.renderJobsContainer)
    }
  }

  renderProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.setState({
        profileDetails: data.profile_details,
        isProfileLoading: false,
      })
    }
    this.setState({
      isProfileLoading: false,
    })
  }

  onClickRetry = () => {
    this.renderProfileDetails()
  }

  renderProfileCard = () => {
    const {profileDetails, isProfileLoading} = this.state
    let card
    if (profileDetails === '') {
      card = (
        <div className="loader-container">
          <button
            type="button"
            className="retry-button"
            onClick={this.onClickRetry}
          >
            Retry
          </button>
        </div>
      )
    } else {
      card = (
        <div className="profile-card">
          <img
            src={profileDetails.profile_image_url}
            alt="profile"
            className="profile-image"
          />
          <h1 className="profile-name">{profileDetails.name}</h1>
          <p className="profile-description">{profileDetails.short_bio}</p>
        </div>
      )
    }

    if (isProfileLoading) {
      return (
        <div testid="loader" className="loader-container">
          <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
        </div>
      )
    }
    return card
  }

  onChangeEmploymentType = event => {
    const {employmentType} = this.state
    if (employmentType.includes(event.target.value)) {
      const updatedList = employmentType.filter(
        eachItem => eachItem !== event.target.value,
      )
      this.setState({employmentType: [...updatedList]}, this.renderJobs)
    } else {
      this.setState(
        {employmentType: [...employmentType, event.target.value]},
        this.renderJobs,
      )
    }
  }

  renderSortByEmploymentTypeDetailsContainer = () => {
    const {employmentType} = this.state
    return (
      <>
        <form
          className="first-sort-container"
          onChange={this.onChangeEmploymentType}
        >
          <h1 className="first-sort-heading">Type of Employment</h1>
          <ul className="ul">
            {employmentTypesList.map(eachItem => (
              <li
                className="checkbox-container"
                key={eachItem.employmentTypeId}
              >
                <input
                  type="checkbox"
                  id={eachItem.employmentTypeId}
                  className="checkbox"
                  value={eachItem.employmentTypeId}
                  checked={employmentType.includes(eachItem.employmentTypeId)}
                />
                <label htmlFor={eachItem.employmentTypeId} className="label">
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
        </form>
      </>
    )
  }

  onSelectSalary = event => {
    this.setState({selectedRadioButton: event.target.value}, this.renderJobs)
  }

  renderSortBySalaryRangesListContainer = () => {
    const {selectedRadioButton} = this.state
    return (
      <>
        <h1 className="first-sort-heading">Salary Range</h1>
        <form className="first-sort-container" onChange={this.onSelectSalary}>
          <ul className="ul">
            {salaryRangesList.map(eachItem => (
              <li className="checkbox-container" key={eachItem.salaryRangeId}>
                <input
                  type="radio"
                  id={eachItem.salaryRangeId}
                  className="checkbox"
                  value={eachItem.salaryRangeId}
                  checked={selectedRadioButton === eachItem.salaryRangeId}
                />
                <label htmlFor={eachItem.salaryRangeId} className="label">
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
        </form>
      </>
    )
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.renderJobs()
  }

  renderSortContainer = () => {
    const {searchInput} = this.state
    return (
      <ul className="sort-container">
        <li className="search-container">
          <input
            type="search"
            placeholder="Search"
            className="sort-search-bar"
            onChange={this.onSearch}
            value={searchInput}
          />
          <button
            testid="searchButton"
            onClick={this.onClickSearch}
            type="button"
            className="search-button"
          >
            <BsSearch className="search-icon" />
          </button>
        </li>
        <li>{this.renderProfileCard()}</li>
        <hr className="line" />
        <li>{this.renderSortByEmploymentTypeDetailsContainer()}</li>
        <hr className="line" />
        <li>{this.renderSortBySalaryRangesListContainer()}</li>
      </ul>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="sort-and-jobs">
          {this.renderSortContainer()}
          {this.renderJobsContainer()}
        </div>
      </>
    )
  }
}

export default Jobs
