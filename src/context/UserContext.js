import React, {useContext, useState} from 'react'
import axios from 'axios'

const UserContext = React.createContext()

export const useUsers = () => {
    return useContext(UserContext)
}

const UserContextProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(true)
    const [isUserLoading, setIsUserLoading] = useState(false)
    const [requestSucceeded, setRequestSucceeded] = useState(false)
    const [errors, setErrors] = useState()

    const signup = (data, history) => {
        axios.post('/users/signup', data).then(res => {
            setIsUserLoading(true)

            if(res.status === 201) {
                setRequestSucceeded(true)
                setIsUserLoading(false)
                setAuthenticated(true)
                setTimeout(() => {
                    history.push('/map')
                    setRequestSucceeded(false)
                }, 3000)
            }
        }).catch(err => {
            console.log(err.response)
            setErrors(err.response.data.error)
        })
    }

    const value = {
        requestSucceeded,
        authenticated,
        isUserLoading,
        errors,
        signup
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
