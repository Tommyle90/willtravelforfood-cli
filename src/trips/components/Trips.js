import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import { Link, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import { tripsIndex } from './api'

class Trips extends Component {

  constructor (props) {
    super(props)
    console.log(props)
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
    return (
      <div>
        {this.state.trips.map(trip => {
          return (
            <div className="tripslist" key={trip.id}>
              <h4>{trip.city}</h4>
              <p>{trip.date}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default withRouter(Trips)
