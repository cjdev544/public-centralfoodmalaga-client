import jwtDecode from 'jwt-decode'
import { TOKEN } from './constants'

export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN, token)
  }
}

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN)
  }
}

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN)
  }
}

export const isTokenExpired = (token) => {
  const decoToken = jwtDecode(token)
  const expireData = decoToken.exp * 1000
  const currentDate = new Date().getTime()
  if (currentDate > expireData) return true
  return false
}
