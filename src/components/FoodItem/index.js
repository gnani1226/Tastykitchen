/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'
import './index.css'

class FoodItem extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value
          const {quantity} = this.state
          const {item} = this.props

          const onClickAdd = () => {
            this.setState(
              prevState => ({
                quantity: prevState.quantity + 1,
              }),
              addCartItem({...item, quantity: quantity + 1}),
            )
          }

          const onClickDecrement = () => {
            this.setState(prevState => ({
              quantity: prevState.quantity - 1,
            }))
            decrementCartItemQuantity(item.id)
          }

          const onClickIncrement = () => {
            this.setState(prevState => ({
              quantity: prevState.quantity + 1,
            }))
            incrementCartItemQuantity(item.id)
          }

          return (
            <li key={item.id} className="food-item" testid="foodItem">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="food-item-image"
              />
              <div>
                <h1 className="food-item-name">{item.name}</h1>
                <div className="food-item-rate-container">
                  <BiRupee className="food-item-rupee-icon" />
                  <p className="food-item-rate">{item.cost}</p>
                </div>
                <div className="food-item-rating-container">
                  <AiFillStar className="food-item-star-icon" />
                  <p className="food-item-rating">{item.rating}</p>
                </div>
                {quantity === 0 ? (
                  <button
                    type="button"
                    className="add-button"
                    onClick={onClickAdd}
                  >
                    ADD
                  </button>
                ) : (
                  <div className="food-item-counter-container">
                    <button
                      testid="decrement-count"
                      type="button"
                      onClick={onClickDecrement}
                      className="food-item-button"
                      aria-label="Button3"
                    >
                      <BsDashSquare className="food-item-counter-icons" />
                    </button>
                    <p testid="active-count" className="food-item-count">
                      {quantity}
                    </p>
                    <button
                      testid="increment-count"
                      type="button"
                      onClick={onClickIncrement}
                      className="food-item-button"
                      aria-label="Button4"
                    >
                      <BsPlusSquare className="food-item-counter-icons" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default FoodItem
