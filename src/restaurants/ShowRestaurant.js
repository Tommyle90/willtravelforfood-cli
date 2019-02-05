import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Link, Redirect, Route} from 'react-router-dom'
import {restaurantIndex} from './api'
import apiUrl from '../apiConfig'
import MUIDataTable from 'mui-datatables'

const ShowRestaurant = (props) => {
  const columns = ['Name', 'Address', 'Telephone', 'Dish', 'Delete']
  const options = {
    responsive: 'scroll',
    selectableRows: false,
    filter: false
  }
  let data = {}
  const tripIt = props.trip.restaurants.map(restaurant => (
    data = [
      restaurant.name,
      restaurant.address,
      restaurant.telephone,
      restaurant.dish,
      <button key={restaurant.id} className='input-list dtl-btn' type='submit' data-id={restaurant.id} onClick={props.handleDelete}>Delete</button>]
  ))
  return (
    <MUIDataTable
      title={'Restaurants'}
      data={tripIt}
      columns={columns}
      options={options}
    />
  )
}

export default withRouter(ShowRestaurant)
