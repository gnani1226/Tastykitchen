/* eslint-disable react/no-unknown-property */
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {cartItem} = props

      const onDecrementCartItem = () => {
        decrementCartItemQuantity(cartItem.id)
      }

      const onIncrementCartItem = () => {
        incrementCartItemQuantity(cartItem.id)
      }

      return (
        <li className="cart-item">
          <div className="cart-item-container" testid="cartItem">
            <div className="cart-item-image-container">
              <img
                src={cartItem.imageUrl}
                alt={cartItem.name}
                className="cart-item-image"
              />
              <p className="cart-item-name-desktop">{cartItem.name}</p>
            </div>
            <div className="cart-item-details-container">
              <h1 className="cart-item-name">{cartItem.name}</h1>
              <div className="cart-item-counter">
                <button
                  type="button"
                  className="cart-item-counter-button"
                  onClick={onDecrementCartItem}
                  testid="decrement-quantity"
                  aria-label="Button1"
                >
                  <BsDashSquare className="cart-item-counter-icon " />
                </button>
                <p className="cart-item-count" testid="item-quantity">
                  {cartItem.quantity}
                </p>
                <button
                  testid="increment-quantity"
                  type="button"
                  className="cart-item-counter-button"
                  onClick={onIncrementCartItem}
                  aria-label="Button2"
                >
                  <BsPlusSquare className="cart-item-counter-icon" />
                </button>
              </div>
              <div className="cart-item-cost-container">
                <BiRupee className="cart-item-rupee-icon" />
                <p className="cart-item-rate">
                  {cartItem.quantity * cartItem.cost}
                </p>
              </div>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
