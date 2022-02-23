import Header from '../Header'
import './index.css'

const NotFound = () => {
  const errorMsg = "we're sorry, the page you requested could not be found"
  return (
    <>
      <Header />
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="not-found-image"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-paragraph">{errorMsg}</p>
      </div>
    </>
  )
}

export default NotFound
