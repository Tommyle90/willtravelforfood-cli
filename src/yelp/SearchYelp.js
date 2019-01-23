import React from 'react'
import BusinessList from './components/BusinessList'
import SearchBar from './components/SearchBar'
import Yelp from './components/Yelp'

class SearchYelp extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      businesses: []
    }
    this.searchYelp = this.searchYelp.bind(this)
  }

  searchYelp(term, location, sortBy){
    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState({businesses: businesses})
    })
  }

  render() {
    return (
      <div className="App">
        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={this.state.businesses}/>
      </div>
    )
  }
}

export default SearchYelp
