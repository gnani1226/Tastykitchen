import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dqfyurtdb/image/upload/v1686588411/Group_fuxb0o.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="page-not-found">Page Not Found</h1>
    <p className="page-not-found-description">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/" className="link-to-home-page">
      <button type="button" className="home-page-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
