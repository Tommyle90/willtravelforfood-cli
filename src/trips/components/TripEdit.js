import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import messages from './messages'

class TripEdit extends Component {
  constructor (props) {
    super(props)
    this.state ={
      user: props.user,
      flash: props.flash,
      update: true,
      trip: [],
      id: ''
    }
  }

  handleChange = (event) => {
    const editedMovie = { ...this.state.trip, [event.target.name]: event.target.value }
    this.setState({ trip: editedMovie })
  }

  handleSubmit = event => {
    event.preventDefault()

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${this.state.user.token}`
      },
      body: JSON.stringify({
        trip: this.state.trip
      })
    }
    const id = this.props.match.params.id
    const {flash} = this.state
    fetch(`${apiUrl}/trips/${id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(data => this.setState({ updated: true }))
      .then(() => flash(messages.editTrip, 'flash-success'))
      .catch(() => {
        flash(messages.editError, 'flash-error')
        this.setState({ trip: []})
      })
  }

  render () {
    const id = this.props.match.params.id
    if (this.state.updated) {
      return <Redirect to='/trips/' />
    }
    const { trip } = this.state
    return (
      <React.Fragment>
        <label>Edit Trip</label>
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
      </React.Fragment>
    )
  }
}

export default withRouter(TripEdit)
