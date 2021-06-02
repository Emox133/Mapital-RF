import React, {useEffect, useState} from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import {Switch, Route, useHistory} from 'react-router-dom'
import {theme} from './utils/theme'
import Map from './components/Map'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Appbar from './components/Appbar'
import Home from './pages/Home';
import {useGeometry} from './context/GeometryContext'
// import {useUsers} from './context/UserContext'
import SidePanel from './components/SidePanel';
import {Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root__flex: {
    height: 'calc(100vh - 64px)',
    width: '100vw',
    maxWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  }
}))

function App() {
  const [url, setUrl] = useState('/')
  const {fetchMarkers, fetchCircles} = useGeometry()
  // const {authenticated} = useUsers()
  const classes = useStyles()
  const history = useHistory()
  
  history.listen((location, action) => {
      setUrl(location.pathname)
  })

  useEffect(() => {
    fetchMarkers()
    fetchCircles()
  }, [fetchMarkers, fetchCircles])

  const routes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/map" component={Map} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </Switch>
  )

  return (
    <ThemeProvider theme={theme}>
      <Appbar />
      <Container className={classes.root__flex}>
        {url === '/map' && <SidePanel />}
        {routes}
      </Container>
    </ThemeProvider>
  )
}

export default App;
