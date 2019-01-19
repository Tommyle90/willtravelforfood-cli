import React, { Component } from 'react'
import apiUrl from './apiUrl'
import { Route, Link, Redirect } from 'react-router-dom'

class CreateTrip extends Component {

  constructor (props) {
    super(props)
    this.state = {
      id: null,
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trip: this.state.trip
      })
    }

    fetch(`${apiUrl}/trips/`, options)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      // .then(data => console.log(data.trip.id))
      .then(data => this.setState({ id: data.trip.id }))
      .catch(console.error)
  }
