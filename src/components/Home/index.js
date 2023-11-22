import {Component} from 'react'

import Navbar from '../Navbar'
import Carousel from '../Carousel'
import PopularRestaurants from '../PopularRestaurants'
import Footer from '../Footer'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Navbar activeTab="home" />
        <div className="home-container">
          <Carousel />
          <PopularRestaurants />
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
