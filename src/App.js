import { ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {theme} from './utils/theme'
import GeometryContext from './context/GeometryContext'
import Map from './components/Map'
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const routes = (
    <Switch>
      <Route exact path="/" component={Map} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </Switch>
  )

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GeometryContext>
          {routes}
        </GeometryContext>
      </Router>
    </ThemeProvider>
  )
}

export default App;
