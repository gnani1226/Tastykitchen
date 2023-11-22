/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import Navbar from '../Navbar'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class RestaurantDetails extends Component {
  state = {isLoading: apiStatus.initial, dishes: {}}

  componentDidMount = () => {
    this.getFoodItems()
  }

  getFoodItems = async () => {
    this.setState({isLoading: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const restaurantDetailsUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantDetailsUrl, options)
    const data = await response.json()
    const modifiedData = {
      rating: data.rating,
      id: data.id,
      name: data.name,
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      imageUrl: data.image_url,
      reviewsCount: data.reviews_count,
      opensAt: data.opens_at,
      location: data.location,
      itemsCount: data.items_count,
      foodItems: data.food_items.map(eachItem => ({
        name: eachItem.name,
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        imageUrl: eachItem.image_url,
        id: eachItem.id,
        rating: eachItem.rating,
      })),
    }
    this.setState({isLoading: apiStatus.success, dishes: modifiedData})
  }

  renderLoader = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurant-details-loader-container"
    >
      <Loader type="ThreeDots" color="#F7931E" />
    </div>
  )

  renderFoodItems = () => {
    const {dishes} = this.state

    return (
      <>
        <div className="restaurant-banner">
          <img
            src={dishes.imageUrl}
            alt="restaurant"
            className="restaurant-banner-image"
          />
          <div>
            <h1 className="restaurant-name-in-banner">{dishes.name}</h1>
            <p className="cuisine-type">{dishes.cuisine}</p>
            <p className="location">{dishes.location}</p>
            <div className="ratings-rate-container">
              <div>
                <div className="ratings-container">
                  <AiFillStar className="star-icon-in-banner" />
                  <p className="rating-in-banner">{dishes.rating}</p>
                </div>
                <p className="total-ratings-in-banner">{`${dishes.reviewsCount}+ Ratings`}</p>
              </div>
              <hr className="line-in-banner" />
              <div>
                <div className="rate-container">
                  <BiRupee className="rupee-icon" />
                  <p className="rate">{dishes.costForTwo}</p>
                </div>
                <p className="cost-for-two">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="food-items-bg-container">
          <ul className="food-items-container">
            {dishes.foodItems.map(item => (
              <FoodItem item={item} key={item.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderResults = () => {
    const {isLoading} = this.state

    switch (isLoading) {
      case apiStatus.inProgress:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderFoodItems()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderResults()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
