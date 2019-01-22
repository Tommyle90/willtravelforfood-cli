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

export const tripShow = (credentials, id) => {
  return fetch(apiUrl + `/trips/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${credentials.user.token}`
    }
  })
}
 
