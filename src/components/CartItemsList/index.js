/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'
import Payment from '../Payment'
import Footer from '../Footer'

import './index.css'

class CartItemsList extends Component {
  state = {isOrdered: false}

  onPlaceOrder = () => {
    this.setState({isOrdered: true})
  }

  render() {
    const {isOrdered} = this.state
    return (
      <>
        {isOrdered ? (
          <Payment />
        ) : (
          <>
            <CartContext.Consumer>
              {value => {
                const {cartList} = value

                const getTotalAmount = () => {
                  let amount = 0
                  cartList.forEach(eachItem => {
                    amount += eachItem.cost * eachItem.quantity
                  })
                  return amount
                }

                return (
                  <div className="cart-items-bg-container">
                    <div className="cart-items-width-control-container">
                      <div className="cart-items-heading-container">
                        <div className="item-heading-container">
                          <p className="cart-items-heading">Item</p>
                        </div>
                        <div className="cart-items-quantity-price-container">
                          <p className="cart-items-heading">Quantity</p>
                          <p className="cart-items-heading">Price</p>
                        </div>
                      </div>
                      <ul className="cart-items-container">
                        {cartList.map(eachItem => (
                          <CartItem key={eachItem.id} cartItem={eachItem} />
                        ))}
                      </ul>
                      <div>
                        <hr className="cart-dashed-line" />
                        <div className="total-amount-container">
                          <h1 className="order-total">Order Total:</h1>
                          <div className="total-container">
                            <BiRupee className="order-rupee-icon" />
                            <p className="total" testid="total-price">
                              {getTotalAmount()}
                            </p>
                          </div>
                        </div>
                        <div className="place-order-container">
                          <button
                            type="button"
                            className="place-order-btn"
                            onClick={this.onPlaceOrder}
                          >
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }}
            </CartContext.Consumer>
            <Footer />
          </>
        )}
      </>
    )
  }
}

export default CartItemsList
