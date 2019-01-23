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
        <tbody className="tripslist" key={trip.id}>
          <tr>
            <Link to={`trips/${trip.id}`}>
              <td className='input-list'>{trip.city}</td>
            </Link>
            <td>{trip.date}</td>
          </tr>
        </tbody>
      )
    })
    return (
      <React.Fragment>
        <CreateTrip user={this.state.user}/>
        <table className="table table-hover table-responsive trip-list">
          <thead>
            <tr>
              <th className='input-list'>Travel To</th>
              <th className='input-list'>Date</th>
            </tr>
          </thead>
          {trips}
        </table>
      </React.Fragment>
    )
  }
}

export default withRouter(Trips)
