import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'

class TripEdit extends Component {
  constructor (props) {
    super(props)
    this.state ={
      user: props.user,
      update: true,
      trip: [],
      id: ''
    }
  }

  // componentDidMount () {
  //   const id = this.props.match.params.id
  //
  //   fetch(`${apiUrl}/trips/`)
  //     .then(res => res.ok ? res : new Error())
  //     .then(res => res.json())
  //     .then(data => this.setState({ trip: data.trip }))
  //     .catch(() => this.setState({ notFound: true }))
  // }

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

    fetch(`${apiUrl}/trips/${id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(data => this.setState({ updated: true }))
      .catch(console.error)
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
