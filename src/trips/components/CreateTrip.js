import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import messages from './messages'

class CreateTrip extends Component {

  initialTrip = () => {
    return {
      city: '',
      date: ''
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      id: null,
      user: props.user,
      flash: props.flash,
      trip: this.initialTrip()
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
    const {flash} = this.state
    fetch(`${apiUrl}/trips/`, options)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ trip: data.trip, id: data.trip.id }))
      .then(() => flash(messages.createdTrip, 'flash-success'))
      .catch(() => {
        flash(messages.brokenTrip, 'flash-error')
        this.setState({ trip: this.initialTrip() })
      })
  }

  render () {
    const {trip, id} = this.state
    if (id) {
      return <Redirect to={`/trips/${id}`}/>
    }
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label className='input-list m-2'>City</label>
          <input
            name='city'
            placeholder='city'
            value={trip.city}
            onChange={this.handleChange}
          />
          <label className='input-list m-2'>Date</label>
          <input
            name='date'
            placeholder='Date'
            value={trip.date}
            type='date'
            onChange={this.handleChange}
          />
          <button className='input-list m-2' type='submit'>Submit</button>
        </form>
        <hr />
      </React.Fragment>
    )
  }
}

export default withRouter(CreateTrip)
