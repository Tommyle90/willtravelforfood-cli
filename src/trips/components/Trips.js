import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { tripsIndex } from './api'
import TripShow from './TripShow'
import CreateTrip from './CreateTrip'

class Trips extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: props.user,
      trips: []
    }
  }

  componentDidMount() {
    tripsIndex(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ trips: data.trips }))
      .catch(console.error)
  }

  render () {
    if (this.state.trips.length == 0 ) {
      return <CreateTrip user={this.state.user}/>
    }
    const trips = this.state.trips.map(trip => {
      return (
        <li className="tripslist" key={trip.id}>
          <Link to={`trips/${trip.id}`}>
            <h4>{trip.city}</h4>
            <p>{trip.date}</p>
          </Link>
        </li>
      )
    })
    return (
      <React.Fragment>
        <CreateTrip user={this.state.user}/>
        <h1>Trips</h1>
        <ul className='trips'>{trips}</ul>
      </React.Fragment>
    )
  }
}

export default withRouter(Trips)
