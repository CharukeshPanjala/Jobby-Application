import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import {FaSuitcase} from 'react-icons/fa'
import Header from '../Header'
import './index.css'

class JobItem extends Component {
  state = {
    jobDetails: '',
    similarJobs: '',
    isLoading: true,
  }

  componentDidMount() {
    this.renderJobs()
  }

  retryJobItem = () => {
    this.renderJobs()
  }

  renderSimilarJobs = () => {
    const {similarJobs, isLoading} = this.state
    if (isLoading) {
      return (
        <div testid="loader" className="loader-container">
          <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
        </div>
      )
    }
    return (
      <>
        <h1 className="job-description-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(eachItem => (
            <li
              className="job-item similar-job-item"
              key={eachItem.id}
              onClick={this.onClickSimilarJob}
            >
              <div className="job-item-image-title-rating-container">
                <img
                  alt="similar job company logo"
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
              <h1 className="job-description-heading">Description</h1>
              <p className="job-description">{eachItem.job_description}</p>
              <div className="job-item-location-type-package-container">
                <div className="job-location-type-container">
                  <MdLocationOn className="location" />
                  <p className="location-name">{eachItem.location}</p>
                  <FaSuitcase className="location" />
                  <p className="location-name">{eachItem.employment_type}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderJobItem = () => {
    const {jobDetails, isLoading} = this.state
    if (isLoading) {
      return (
        <div testid="loader" className="loader-container">
          <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
        </div>
      )
    }
    if (jobDetails !== '') {
      return (
        <>
          <div className="job-item" id={jobDetails.id}>
            <div className="job-item-image-title-rating-container">
              <img
                alt="job details company logo"
                src={jobDetails.company_logo_url}
                className="job-item-image"
              />
              <div className="job-item-title-rating-container">
                <h1 className="job-item-title">{jobDetails.title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating">{jobDetails.rating}</p>
                </div>
              </div>
            </div>
            <div className="job-item-location-type-package-container">
              <ul className="job-location-type-container">
                <li className="job-location-type-container">
                  <MdLocationOn className="location" />
                  <p className="location-name">{jobDetails.location}</p>
                </li>
                <li className="job-location-type-container">
                  <FaSuitcase className="location" />
                  <p className="location-name">{jobDetails.employment_type}</p>
                </li>
              </ul>
              <p className="salary">{jobDetails.package_per_annum}</p>
            </div>
            <hr className="line1" />
            <div className="description-heading-container">
              <h1 className="job-description-heading">Description</h1>
              <a href={jobDetails.company_website_url}>Visit</a>
            </div>
            <p className="job-description">{jobDetails.job_description}</p>
            <h1 className="job-description-heading">Skills</h1>
            <ul className="skills-container">
              {jobDetails.skills.map(eachItem => (
                <li className="each-skill" key={eachItem.name}>
                  <img
                    src={eachItem.image_url}
                    alt={eachItem.name}
                    className="skill-image"
                  />
                  <p className="skill-name">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <div className="life-at-company-container">
              <div className="description-container">
                <h1 className="job-description-heading">Life at Company</h1>
                <p className="job-description">
                  {jobDetails.life_at_company.description}
                </p>
              </div>
              <img
                src={jobDetails.life_at_company.image_url}
                alt="life at company"
                className="company-image"
              />
            </div>
          </div>
          {this.renderSimilarJobs()}
        </>
      )
    }
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
        <button type="button" className="retry" onClick={this.retryJobItem}>
          Retry
        </button>
      </div>
    )
  }

  renderJobs = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState(
        {
          isLoading: false,
          jobDetails: data.job_details,
          similarJobs: data.similar_jobs,
        },
        this.renderJobItem,
      )
    }
    this.setState({isLoading: false}, this.renderJobItem)
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-bg-container">{this.renderJobItem()}</div>
      </>
    )
  }
}

export default JobItem
