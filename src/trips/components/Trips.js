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
      flash: props.flash,
      user: props.user,
      trips: [],
      isHidden: true,
    }
  }

  componentDidMount() {
    tripsIndex(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ trips: data.trips }))
      .catch(console.error)
  }
  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render () {
    if (this.state.trips.length == 0 ) {
      return <CreateTrip user={this.state.user}/>
    }
    const trips = this.state.trips.map(trip => {
      return (
        <tbody className="tripslist" key={trip.id}>
          <tr>
            <td className='input-list'><Link to={`/trips/${trip.id}`}>{trip.city}</Link></td>
            <td>{trip.date}</td>
          </tr>
        </tbody>
      )
    })
    return (
      <React.Fragment>
        <button className="input-list m-2" onClick={this.toggleHidden.bind(this)}>Create a Trip</button>
        {!this.state.isHidden && <CreateTrip user={this.state.user} flash={this.state.flash}/>}
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
