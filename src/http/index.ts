import axios, { AxiosRequestConfig } from 'axios'
import { AuthStore } from '../store/auth'

export const baseURL = '/api'

export const axiosConfig: AxiosRequestConfig = {
  baseURL,
}

export const $api = axios.create(axiosConfig)

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
  return config
})
$api.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401) AuthStore.logout()
  throw error
})
