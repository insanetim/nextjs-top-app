import axios from 'axios'

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
  timeout: 10000
})

export default httpClient
