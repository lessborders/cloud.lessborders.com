import axios from 'axios'

let apiBaseUrl = ""
let token = "makethislater"

if(process.client) {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    apiBaseUrl = 'http://localhost:8081/'
  }else{
    apiBaseUrl = 'https://api.lessborders.com/'
  }
}else{
  apiBaseUrl = 'https://api.lessborders.com/'
}

export default () => {
  return axios.create({
    baseURL: apiBaseUrl,
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}