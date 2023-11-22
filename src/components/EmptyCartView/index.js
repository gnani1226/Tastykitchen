import {Link, withRouter} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dqfyurtdb/image/upload/v1686580505/OBJECTS_md5jtg.png"
      alt="empty cart"
      className="no-orders-image"
    />
    <h1 className="no-orders-yet">No Order Yet!</h1>
    <p className="no-orders-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/" className="to-home-nav-link">
      <button type="button" className="empty-cart-order-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default withRouter(EmptyCartView)
