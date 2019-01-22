import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'

class CreateTrip extends Component {

  constructor (props) {
    super(props)
    this.state = {
      id: null,
      user: props.user,
      trip: []
    }
  }

  handleChange = event => {
    const createTrip = { ...this.state.trip, [event.target.name]: event.target.value }
    this.setState({ trip: createTrip })
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
        trip: this.state.trip
      })
    }
    fetch(`${apiUrl}/trips/`, options)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ trip: data.trip, id: data.trip.id }))
      .catch(console.error)
  }

  render () {
    const {trip, id} = this.state
    if (id) {
      return <Redirect to={`/trips/${id}`}/>
    }
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label className='badge badge-primary m-2'>City</label>
          <input
            name='city'
            placeholder='city'
            value={trip.city}
            onChange={this.handleChange}
          />
          <label className='badge badge-primary m-2'>Date</label>
          <input
            name='date'
            placeholder='Date'
            value={trip.date}
            type='date'
            onChange={this.handleChange}
          />
          <button className='btn btn-secondary btn-sm m-2' type='submit'>Submit</button>
        </form>
      </React.Fragment>
    )
  }
}

export default withRouter(CreateTrip)
