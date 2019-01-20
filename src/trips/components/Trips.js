import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import { Link, Redirect } from 'react-router-dom'

class Trips extends Component {

  constructor (props) {
    super(props)

    this.state = {
      id: null,
      user: props.user,
      create: false,
      trip: {
        city: '',
        date: ''
      }
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
      .then(data => this.setState({ id: data.trip.id, created: true }))
      .catch(console.error)
  }
  render () {
    if (this.state.created === true) {
      return <Redirect to={'/trips/'} />
    }
    const { id, trip } = this.state
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
          <button className='badge badge-primary m-2' type='submit'>Submit</button>
          <button className='badge badge-warning m-2'><Link to='/trips/'>Back to Trips</Link></button>
        </form>
      </React.Fragment>

    )
  }
}

export default Trips
