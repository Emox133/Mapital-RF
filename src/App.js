import React, {useEffect} from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {theme} from './utils/theme'
import Map from './components/Map'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Appbar from './components/Appbar'
import Home from './pages/Home';
import {useGeometry} from './context/GeometryContext'

function App() {
  const {fetchMarkers} = useGeometry()

  useEffect(() => {
    fetchMarkers()
  }, [fetchMarkers])

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
      <Router>
          <Appbar />
          {routes}
      </Router>
    </ThemeProvider>
  )
}

export default App;
