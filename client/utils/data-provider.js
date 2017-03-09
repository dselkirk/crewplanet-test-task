import axios from 'axios';

export function getAirportsList(query, successCallback) {
  return axios.get('https://places.aviasales.ru/match?max=10&term=' + query)
    .then(function (response) {
      console.log(response);
      successCallback.call(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
