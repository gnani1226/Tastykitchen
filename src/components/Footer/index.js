import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/dqfyurtdb/image/upload/v1686410236/Group_7420_zugata.png"
          alt="website-footer-logo"
        />
        <h1 className="title-in-footer">Tasty Kitchens</h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food. Contact us on
      </p>
      <div>
        <FaPinterestSquare
          className="social-media-icon"
          testid="pintrest-social-icon"
        />
        <FaInstagram
          className="social-media-icon"
          testid="instagram-social-icon"
        />
        <FaTwitter className="social-media-icon" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="social-media-icon"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
