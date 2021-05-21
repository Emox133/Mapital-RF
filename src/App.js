import Map from './components/Map'
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './utils/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Map />
    </ThemeProvider>
  )
}

export default App;
