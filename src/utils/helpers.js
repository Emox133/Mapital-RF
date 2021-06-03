import axios from 'axios'

export const ValidateIsEmpty = (...inputs) => inputs.every(el => el.trim() !== '')

export const setAuthorizationHeader = (token) => {
    const JWT = `Bearer ${token}`
    localStorage.setItem('token', JWT)
    axios.defaults.headers.common['Authorization'] = JWT
}
