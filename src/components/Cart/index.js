import {Component} from 'react'

import Navbar from '../Navbar'
import CartContext from '../../context/CartContext'
import CartItemsList from '../CartItemsList'
import EmptyCartView from '../EmptyCartView'
import './index.css'

class Cart extends Component {
  render() {
    return (
      <>
        <Navbar activeTab="cart" />
        <CartContext.Consumer>
          {value => {
            const {cartList} = value
            return cartList.length === 0 ? <EmptyCartView /> : <CartItemsList />
          }}
        </CartContext.Consumer>
      </>
    )
  }
}

export default Cart
