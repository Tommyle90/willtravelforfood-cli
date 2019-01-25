import React, { Component } from 'react'
import apiUrl from '../apiConfig'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import { tripShow } from '../trips/components/api'
import messages from './messages'

class CreateRestaurant extends Component {

  initialRest = () => {
    return {
      trip_id: this.props.match.params.id,
      deleted: false,
      name: '',
      address: '',
      telephone: '',
      dish: '',
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      flash: props.flash,
      user: props.user,
      deleted: false,
      notFound: false,
      created: false,
      trip: {
        restaurants: []
      },
      restaurant: this.initialRest()
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
    const {flash} = this.state
    fetch(`${apiUrl}/restaurants`, options)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ restaurant: data.restaurant, created: true }))
      .then(() => flash(messages.restaurantCreate, 'flash-success'))
      .catch(() => {
        flash(messages.errorCreate, 'flash-error')
        this.setState({
          restaurant: this.initialRest()
        })
      })
  }

  render () {
    const {trip, restaurant, deleted, notFound, created } = this.state
    const id = this.props.match.params.id
    if (!trip) {
      return <p>loading...</p>
    } else if (deleted) {
      return (<Redirect to={`/trips/${id}`} />
      )
    } else if (created) {
      return (<Redirect to='/trips/' />
      )
    }
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label className='input-list m-2'>Name</label>
          <input
            name='name'
            placeholder='Restaurant Name'
            value={restaurant.name}
            onChange={this.handleChange}
          />
          <label className='input-list m-2'>Address</label>
          <input
            name='address'
            placeholder='Address'
            value={restaurant.address}
            onChange={this.handleChange}
          />
          <label className='input-list m-2'>Telephone</label>
          <input
            name='telephone'
            placeholder='Telephone #'
            value={restaurant.telephone}
            onChange={this.handleChange}
          />
          <label className='input-list m-2'>Top Dish</label>
          <input
            name='dish'
            placeholder='Top Dish'
            value={restaurant.dish}
            onChange={this.handleChange}
          />
          <button className='input-list m-2' type='submit'>Submit</button>
        </form>
      </React.Fragment>
    )
  }
}

export default withRouter(CreateRestaurant)
