import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { ThemeProvider } from '@material-ui/core/styles';
import {Switch, Route, useHistory} from 'react-router-dom'
import {theme} from './utils/theme'
import Map from './components/Map'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Appbar from './components/Appbar'
import Home from './pages/Home';
import {useGeometry} from './context/GeometryContext'
import {useUsers} from './context/UserContext'
// import {useUsers} from './context/UserContext'
import SidePanel from './components/SidePanel';
import {Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import jwtDecode from 'jwt-decode'
import Loader from './components/CircularProgress'
import GuardedRoute from './utils/GuardedRoute'

const useStyles = makeStyles(theme => ({
  root__flex: {
    // height: 'calc(100vh + 64px)',
    height: '95vh',
    width: '100vw',
    maxWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)',
      flexDirection: 'row'
    }
  }
}))

function App() {
  const [url, setUrl] = useState('/')
  const {fetchMarkers, fetchCircles} = useGeometry()
  const {authenticated, setAuthenticated, getUser, logout, isUserLoading} = useUsers()
  const classes = useStyles()
  const history = useHistory()
  
  history.listen((location, action) => {
      setUrl(location.pathname)
  })

  const token = localStorage.token

  useEffect(() => {
    if(token) {
      // 1) If there is a token, decode it
      const decodedToken = jwtDecode(token)
    
      // 2) Check if the token is expired
      if(new Date(decodedToken.exp * 1000) < new Date()) {
        logout(history)
      } 

      setAuthenticated(true)
      axios.defaults.headers.common['Authorization'] = token
      getUser()
    }
  }, [token, logout, history, setAuthenticated, getUser])

  useEffect(() => {
    fetchMarkers()
    fetchCircles()
  }, [fetchMarkers, fetchCircles])

  const routes = (
    <Switch>
        <GuardedRoute exact path="/" component={Home} auth={!authenticated} />
        <Route path="/map" component={Map} />
        <GuardedRoute path="/signup" component={Signup} auth={!authenticated} />
        <GuardedRoute path="/login" component={Login} auth={!authenticated} />
    </Switch>
  )

  const isAppLoading = !isUserLoading ? (
      <ThemeProvider theme={theme}>
        <Appbar />
        <Container className={classes.root__flex}>
          {url === '/map' && <SidePanel />}
          {routes}
        </Container>
      </ThemeProvider>
  ) : (
    <Loader />
  )

  return (
    <div className="app">
      {isAppLoading}
    </div>
  )
}

export default App;
