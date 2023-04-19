import axios from 'axios'

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
  timeout: 5000
})

export default httpClient
