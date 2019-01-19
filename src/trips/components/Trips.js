import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'

class Trips extends Component {

  constructor (props) {
    super(props)

    this.state = {
      trips: null
    }
  }

  componentDidMount() {
    fetch(`${apiUrl}/trips`)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ trips: data.trips }))
      .catch(console.error)
  }
  render () {
    return (
      <React.Fragment>
        <Link to="/createtrip">Create Trip</Link>
      </React.Fragment>
    )

    // if (!this.state.trips) {
    //   return <p>loading...</p>
    // }
    //
    // const trips = this.state.trips.map(trip => (
    //   <li className='m-2' key={ trip.id }>
    //     <Link to={`/trips/${trip.id}`}>
    //     Trip Title: { trip.title }
    //     </Link>
    //   </li>))
    //
    // return (
    //   <React.Fragment>
    //     <h4 className='m-2'>Trips:</h4>
    //     <ul>
    //       {trips}
    //     </ul>
    //   </React.Fragment>
    // )
  }
}

export default Trips
