import apiUrl from '../apiConfig'

export const restaurantIndex = (credentials) => {
  return fetch(apiUrl + '/restaurants', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${credentials.user.token}`
    }
  })
}
