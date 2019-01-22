import React, {Component} from 'react'
import {withRouter} from 'react-router'
import apiUrl from '../../apiConfig'
import {tripShow} from './api'
import {Link, Redirect, Route} from 'react-router-dom'
import TripEdit from './TripEdit'
import CreateRestaurant from '../../restaurants/CreateRestaurant'


class TripShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trip: [],
      user: props.user,
      deleted: false,
      notFound: false,
      id: ''
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
        'Content-Type': 'application/json',
        'Authorization': `Token token=${this.state.user.token}`
      }
    }
    const id = this.props.match.params.id

    fetch(`${apiUrl}/trips/${id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(() => this.setState({ deleted:true }))
      .catch(console.error)
  }

  render () {
    const { trip, notFound, deleted }  = this.state
    if (notFound) {
      return <Redirect to='/trips' />
    } else if (!trip) {
      return <p>loading...</p>
    } else if (deleted) {
      return (<Redirect to={{
        pathname: '/trips'
      }} />
      )
    }

    const { city, date } = trip
    return (
      <React.Fragment>
        <h4>Trip to {city}</h4>
        <p>Date: {date}</p>
        <hr />
        <div>
          Edit Trip: <TripEdit user={this.state.user}/>
        </div>
        <button className='btn btn-secondary btn-sm m-2'><Link to='/trips'>Back</Link></button>
        <button className="btn btn-secondary btn-sm m-2" onClick={this.destroy}>Delete</button>
        <button className="btn btn-secondary btn-sm m-2">Add Restaurant</button>
        <CreateRestaurant user={this.state.user}/>
      </React.Fragment>
    )
  }

}

export default withRouter(TripShow)
