import apiUrl from '../../apiConfig'

export const tripsIndex = (credentials) => {
  return fetch(apiUrl + '/trips', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${credentials.user.token}`
    }
  })
}
