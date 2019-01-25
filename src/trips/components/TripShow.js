import React, {Component} from 'react'
import {withRouter} from 'react-router'
import apiUrl from '../../apiConfig'
import {tripShow} from './api'
import {Link, Redirect, Route} from 'react-router-dom'
import TripEdit from './TripEdit'
import CreateRestaurant from '../../restaurants/CreateRestaurant'
import ShowRestaurant from '../../restaurants/ShowRestaurant'
import messages from './messages'


class TripShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flash: props.flash,
      user: props.user,
      deleted: false,
      notFound: false,
      id: '',
      isHidden: true,
      isHidden1: true,
      trip: {
        restaurants: []
      },
      restaurant: {
        trip_id: props.match.params.id,
        deleted: false,
      }
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    tripShow(this.state, id)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState( { trip: data.trip } ))
      .then(data => this.setState( { id: id } ))
      .catch(() => this.setState({notFound: true}))
  }
  destroy = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      }
    }
    const id = this.props.match.params.id
    const {flash} = this.state
    fetch(`${apiUrl}/trips/${id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(() => this.setState({ deleted:true }))
      .then(() => flash(messages.deletedTrip, 'flash-success'))
      .catch(() => flash(messages.unableToDelete, 'flash-error'))
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  toggleHidden1 () {
    this.setState({
      isHidden1: !this.state.isHidden1
    })
  }
  handleDelete = event => {
    const id = event.currentTarget.dataset.id
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      }
    }
    const {flash} = this.state
    fetch(`${apiUrl}/restaurants/${id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(() => this.setState({ deleted:true }))
      .then(() => flash(messages.deletedRestaurant, 'flash-success'))
      .catch(() => flash(messages.deleteError, 'flash-error'))
  }
  render () {
    const { trip, notFound, deleted }  = this.state
    if (notFound) {
      return <Redirect to='/trips' />
    } else if (!trip) {
      return <p>loading...</p>
    } else if (deleted) {
      return (<Redirect to='/trips' />
      )
    }
    const { city, date } = trip
    return (
      <React.Fragment>
        <h2 className='input-list'>Trip to {city}</h2>
        <p>Date: {date}</p>
        <hr />
        {!this.state.isHidden1 && <TripEdit user={this.state.user} flash={this.state.flash}/>}
        {!this.state.isHidden && <CreateRestaurant user={this.state.user} flash={this.state.flash}/>}
        <button className='input-list m-2'><Link to='/trips' className='input-list m-2'>Back</Link></button>
        <button className="input-list m-2" onClick={this.destroy}>Delete</button>
        <button className="input-list m-2" onClick={this.toggleHidden1.bind(this)}>Edit Trip Info</button>
        <button className="input-list m-2" onClick={this.toggleHidden.bind(this)}>Add Restaurant</button>
        <ShowRestaurant
          user={this.state.user}
          trip={this.state.trip}
          handleDelete={this.handleDelete}
        />
      </React.Fragment>
    )
  }

}

export default withRouter(TripShow)
