import { ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {theme} from './utils/theme'
import GeometryContext from './context/GeometryContext'
import Map from './components/Map'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Appbar from './components/Appbar'
import Home from './pages/Home';

function App() {
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
        <GeometryContext>
          <Appbar />
          {routes}
        </GeometryContext>
      </Router>
    </ThemeProvider>
  )
}

export default App;
