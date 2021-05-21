import Map from './components/Map'
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './utils/theme'
import GeometryContext from './context/GeometryContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GeometryContext>
        <Map />
      </GeometryContext>
    </ThemeProvider>
  )
}

export default App;
