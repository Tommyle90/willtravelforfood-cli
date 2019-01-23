import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Link, Redirect, Route} from 'react-router-dom'
import {restaurantIndex} from './api'
import apiUrl from '../apiConfig'

const ShowRestaurant = (props) => {
  const tripIt = props.trip.restaurants.map(restaurant => (
    <React.Fragment key={restaurant.id}>
      <div className="restaurantlist">
        <h2 className='input-list'>Restaurants</h2>
        <p>
          Name: {restaurant.name}
        </p>
        <p>
          Address: {restaurant.address}
        </p>
        <p>
          Telephone: {restaurant.telephone}
        </p>
        <p>
          Top Dish: {restaurant.dish}
        </p>
      </div>
    </React.Fragment>
  ))
  return (
    <React.Fragment>
      {tripIt}
    </React.Fragment>
  )
}

export default withRouter(ShowRestaurant)
