import React, { Component } from 'react'
import apiUrl from '../apiConfig'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import { tripShow } from '../trips/components/api'

class CreateRestaurant extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.user,
      trip: {
        restaurants: []
      },
      restaurant: {
        trip_id: props.match.params.id
      }
    }
  }
  componentDidMount () {
    const id = this.props.match.params.id
    tripShow(this.state, id)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState( { trip: data.trip } ))
      .then(data => this.setState( { id: id } ))
      .catch(() => this.setState({notFound: true}))
  }
  handleChange = event => {
    const createRestaurant = { ...this.state.restaurant, [event.target.name]: event.target.value }
    this.setState({ restaurant: createRestaurant })
  }
  handleSubmit = event => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${this.state.user.token}`
      },
      body: JSON.stringify({
        restaurant: this.state.restaurant
      })
    }
    fetch(`${apiUrl}/restaurants`, options)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ restaurant: data.restaurant, id: data.trip.id }))
      .catch(console.error)
  }
  render () {
    const {trip, restaurant } = this.state
    // if (id) {
    //   return <Redirect to={`/trips/${id}`}/>
    // }
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label className='badge badge-primary m-2'>Name</label>
          <input
            name='name'
            placeholder='Restaurant Name'
            value={restaurant.name}
            onChange={this.handleChange}
          />
          <label className='badge badge-primary m-2'>Address</label>
          <input
            name='address'
            placeholder='Address'
            value={restaurant.address}
            onChange={this.handleChange}
          />
          <label className='badge badge-primary m-2'>Telephone</label>
          <input
            name='telephone'
            placeholder='Telephone #'
            value={restaurant.telephone}
            onChange={this.handleChange}
          />
          <label className='badge badge-primary m-2'>Top Dish</label>
          <input
            name='dish'
            placeholder='Top Dish'
            value={restaurant.dish}
            onChange={this.handleChange}
          />
          <button className='btn btn-secondary btn-sm m-2' type='submit'>Submit</button>
        </form>
      </React.Fragment>
    )
  }
}

export default withRouter(CreateRestaurant)
