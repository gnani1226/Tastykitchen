/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import './index.css'

class Carousel extends Component {
  state = {offersList: [], isLoading: false}

  componentDidMount = () => {
    this.getOffersList()
  }

  getOffersList = async () => {
    this.setState({isLoading: true})
    const carouselUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(carouselUrl, options)
    const data = await response.json()
    const modifiedData = data.offers.map(eachData => ({
      id: eachData.id,
      imageUrl: eachData.image_url,
    }))
    this.setState({offersList: modifiedData, isLoading: false})
  }

  renderLoader = () => (
    <div testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#F7931E" />
    </div>
  )

  renderOffers = () => {
    const {offersList} = this.state
    const settings = {
      slidesToShow: 1,
      dots: true,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      dotsClass: 'slick-dots',
    }

    return (
      <ul className="carousel-container">
        <Slider {...settings}>
          {offersList.map(eachOffer => (
            <li key={eachOffer.id}>
              <img
                src={eachOffer.imageUrl}
                alt="offer"
                className="carousel-item"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderOffers()
  }
}

export default Carousel
