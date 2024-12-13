import axios from 'axios'

export const useApi = () => {
  const config = useRuntimeConfig()

  const accessToken = useCookie('auth_token')

  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
    headers: { 'Content-Type': 'application/json' },
  })

  api.interceptors.request.use(
    (reqConfig) => {
      if (accessToken.value) {
        reqConfig.headers['Authorization'] = `Bearer ${accessToken.value}`
      }
      return reqConfig
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        accessToken.value = null
        navigateTo('/auth/login')
      }
      return Promise.reject(error)
    }
  )

  return api
}
