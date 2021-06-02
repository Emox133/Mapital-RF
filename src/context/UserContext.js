import React, {useContext, useState} from 'react'
import {setAuthorizationHeader} from './../utils/helpers'
import axios from 'axios'

const UserContext = React.createContext()

export const useUsers = () => {
    return useContext(UserContext)
}

const UserContextProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [isUserLoading, setIsUserLoading] = useState(false)
    const [requestSucceeded, setRequestSucceeded] = useState(false)
    const [errors, setErrors] = useState()

    const signup = (data, history) => {
        axios.post('/users/signup', data).then(res => {
            setIsUserLoading(true)

            if(res.status === 201) {
                setRequestSucceeded(true)
                setIsUserLoading(false)
                setAuthorizationHeader(res.data.token)
                setTimeout(() => {
                    setAuthenticated(true)
                    history.push('/map')
                    setRequestSucceeded(false)
                }, 2000)
            }
        }).catch(err => {
            console.log(err.response)
            setErrors(err.response.data.error)
        })
    }

    const login = (data, history) => {
        axios.post('/users/login', data)
        .then(res => {
            setIsUserLoading(true)

            if(res.status === 201) {
                setRequestSucceeded(true)
                setIsUserLoading(false)
                setAuthorizationHeader(res.data.token)
                setTimeout(() => {
                    setAuthenticated(true)
                    history.push('/map')
                    setRequestSucceeded(false)
                }, 2000)
            }
        })
        .catch(err => {
            console.log(err.response)
            setErrors(err.response.data.error)
        })
    }

    const logout = (history) => {
        localStorage.removeItem('token')
        setAuthenticated(false)
        delete axios.defaults.headers.common['Authorization']
        history.push('/login')
        history.go(0)
    }

    const value = {
        requestSucceeded,
        authenticated,
        setAuthenticated,
        isUserLoading,
        errors,
        signup,
        login,
        logout
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
