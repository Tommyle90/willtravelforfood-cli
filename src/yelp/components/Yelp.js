const apiKey = '5hAlD9AY91KtVFvmbn3xb1RE0FQM7v-LaB1kj-SPJrG3l_IOwBtAUZY7UYkubuFGuoT-_YREci2c6dtVVHelOTfOJZI6-RFwJI03uHzW8tr9eKBkn-oU8DdsRSRBXHYx'

const Yelp = {
  search(term, location, sortBy){
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json()
    }).then(jsonResponse => {
      if(jsonResponse.businesses){
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        }))
      }
    })
  }
}

export default Yelp
