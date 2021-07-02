import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { ThemeProvider } from '@material-ui/core/styles';
import {Switch, Route, useHistory} from 'react-router-dom'
import {theme} from './utils/theme'
import Loader from './components/CircularProgress'
import Appbar from './components/Appbar'
import {useGeometry} from './context/GeometryContext'
import {useUsers} from './context/UserContext'
import SidePanel from './components/SidePanel';
import {Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import jwtDecode from 'jwt-decode'
import GuardedRoute from './utils/GuardedRoute'
import FilterPanel from './components/FilterPanel';
import ErrorBoundary from './utils/ErrorBoundary';
import NoConnection from './utils/NoConnection';

const Home = React.lazy(() => import('./pages/Home'))
const Signup = React.lazy(() => import('./pages/Signup'))
const Login = React.lazy(() => import('./pages/Login'))
const Map = React.lazy(() => import('./components/Map'))

const useStyles = makeStyles(theme => ({
  root__flex: {
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
  const {authenticated, setAuthenticated, getUser, logout} = useUsers()
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
    if(url === '/map') {
      fetchMarkers()
      fetchCircles()
    }
  }, [fetchMarkers, fetchCircles, url])

  const routes = (
    <ErrorBoundary>
      <React.Suspense fallback={<Loader />}>
        <Switch>
            <GuardedRoute exact path="/" component={Home} auth={!authenticated} />
            <Route path="/map" component={Map} />
            <GuardedRoute path="/signup" component={Signup} auth={!authenticated} />
            <GuardedRoute path="/login" component={Login} auth={!authenticated} />
        </Switch>
      </React.Suspense>
    </ErrorBoundary>
  )

  const isAppLoading = (
      <ThemeProvider theme={theme}>
        <Appbar />
        <Container className={classes.root__flex}>
          {url === '/map' && (
            <>
              <SidePanel />
              <FilterPanel />
            </>
          )}
          <NoConnection />
          {routes}
        </Container>
      </ThemeProvider>
  ) 

  return (
    <div className="app">
      {isAppLoading}
    </div>
  )
}

export default App;
