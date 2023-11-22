/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BsFilterLeft} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import {Link} from 'react-router-dom'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class PopularRestaurants extends Component {
  state = {
    restaurantsList: [],
    isLoading: false,
    activePage: 1,
    totalPages: 0,
    sortBy: sortByOptions[1].value,
  }

  componentDidMount = () => {
    this.getRestaurantsList()
  }

  onChangeSortBy = event => {
    this.setState({sortBy: event.target.value}, this.getRestaurantsList)
  }

  onClickLeftPagination = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurantsList,
      )
    }
  }

  onClickRightPagination = () => {
    const {activePage, totalPages} = this.state
    if (activePage < totalPages) {
      this.setState({activePage: activePage + 1}, this.getRestaurantsList)
    }
  }

  getRestaurantsList = async () => {
    this.setState({isLoading: true})
    const {activePage, sortBy} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const popularRestaurantsUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortBy}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(popularRestaurantsUrl, options)
    const data = await response.json()
    const modifiedData = data.restaurants.map(eachRestaurant => ({
      costForTwo: eachRestaurant.cost_for_two,
      cuisine: eachRestaurant.cuisine,
      groupByTime: eachRestaurant.group_by_time,
      hasOnlineDelivery: eachRestaurant.has_online_delivery,
      hasTableBooking: eachRestaurant.has_table_booking,
      id: eachRestaurant.id,
      imageUrl: eachRestaurant.image_url,
      isDeliveringNow: eachRestaurant.is_delivering_now,
      location: eachRestaurant.location,
      menuType: eachRestaurant.menu_type,
      name: eachRestaurant.name,
      opensAt: eachRestaurant.opens_at,
      userRating: {
        rating: eachRestaurant.user_rating.rating,
        ratingColor: eachRestaurant.user_rating.rating_color,
        ratingText: eachRestaurant.user_rating.rating_text,
        totalReviews: eachRestaurant.user_rating.total_reviews,
      },
    }))
    const {total} = data
    const totalPages = Math.ceil(total / limit)
    this.setState({isLoading: false, restaurantsList: modifiedData, totalPages})
  }

  renderLoader = () => (
    <div className="restaurants-loader" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" />
    </div>
  )

  renderRestaurants = () => {
    const {restaurantsList, activePage, totalPages} = this.state
    return (
      <>
        <ul className="restaurants-container">
          {restaurantsList.map(eachRestaurant => (
            <Link
              to={`/restaurant/${eachRestaurant.id}`}
              className="link"
              key={eachRestaurant.id}
            >
              <li testid="restaurant-item" className="restaurant-item">
                <img
                  src={eachRestaurant.imageUrl}
                  alt="restaurant"
                  className="restaurant-image"
                />
                <div className="restaurant-details">
                  <h1 className="restaurant-name">{eachRestaurant.name}</h1>
                  <p className="cuisine">{eachRestaurant.cuisine}</p>
                  <div className="ratings-container">
                    <AiFillStar color="#FFCC00" size={12} />
                    <p className="rating">{eachRestaurant.userRating.rating}</p>
                    <p className="total-ratings">{`(${eachRestaurant.userRating.totalReviews} ratings)`}</p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
        <div className="pagination-container">
          <button
            testid="pagination-left-button"
            type="button"
            className="pagination-button"
            onClick={this.onClickLeftPagination}
            aria-label="Submit Button8"
          >
            <FiChevronLeft size={12} />
          </button>
          <p className="pagination">
            <span
              testid="active-page-number"
              className="active-pagination"
            >{`${activePage}`}</span>
            {` of ${totalPages}`}
          </p>
          <button
            testid="pagination-right-button"
            type="button"
            className="pagination-button"
            onClick={this.onClickRightPagination}
            aria-label="Submit Button7"
          >
            <FiChevronRight size={12} />
          </button>
        </div>
      </>
    )
  }

  render() {
    const {isLoading, sortBy} = this.state
    return (
      <div className="popular-restaurants-bg-container">
        <h1 className="popular-restaurants">Popular Restaurants</h1>
        <div className="filter-description-container">
          <p className="popular-restaurants-description">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="filter-container">
            <BsFilterLeft size={24} />
            <p className="sort-by-text">Sort by</p>
            <select
              className="select-style"
              value={sortBy}
              onChange={this.onChangeSortBy}
            >
              {sortByOptions.map(eachOption => (
                <option value={eachOption.value} key={eachOption.id}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="horizontal-line" />
        {isLoading ? this.renderLoader() : this.renderRestaurants()}
      </div>
    )
  }
}

export default PopularRestaurants
