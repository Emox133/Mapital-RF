import React from 'react'
import {Typography, Box} from '@material-ui/core'

const boxStyle = {
    height: 'calc(100vh - 64px)',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}

// Error boundaries currently have to be classes.
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    autoReloadAfter () {
        if(this.state.hasError) {
            setTimeout(() => {
                window.location.reload()
            }, 5000)
        }
    }

    componentDidUpdate() {
        this.autoReloadAfter()
    }

    static getDerivedStateFromError(error) {
      return {
        hasError: true,
        error
      };
    }
    render() {
      if (this.state.hasError) {
        return (
            <Box style={boxStyle}>
                <Typography variant="h4">
                    Something went wrong. <span>&#128165;</span>
                </Typography>
                <Typography>
                    Automatsko učitavanje za 5 sekundi...
                </Typography>
            </Box>
        )
      }
      return this.props.children;
    }
  }

  export default ErrorBoundary