import {withRouter, Link} from 'react-router-dom'

import CartContext from '../../context/CartContext'
import './index.css'

const Payment = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllCartItems} = value

      const onClickGoToHome = () => {
        removeAllCartItems()
      }

      return (
        <div className="payment-container">
          <img
            src="https://res.cloudinary.com/dqfyurtdb/image/upload/v1686586463/Vector_eij9m5.png"
            alt="Payment Done"
            className="done-image"
          />
          <h1 className="payment-successful">Payment Successful</h1>
          <p className="success-description">
            Thank you for ordering Your payment is successfully completed.
          </p>
          <Link to="/" className="payment-to-home-link">
            <button
              type="button"
              className="go-to-home-btn"
              onClick={onClickGoToHome}
            >
              Go To Home Page
            </button>
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Payment)
