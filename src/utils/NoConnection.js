import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NoConnection() {
  const [offline, setOffline] = React.useState(!window.navigator.onLine);
  const [connectionAvailable, setConnectionAvailable] = React.useState(false)
  const [connectionNotAvailable, setConnectionNotAvailable] = React.useState(false)

  useEffect(() => {
      window.addEventListener('offline', () => {
          setOffline(true)
          setConnectionNotAvailable(true)
      })

      window.addEventListener('online', () => {
          setOffline(false)
          setConnectionAvailable(true)
      })
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setConnectionAvailable(false);
    setConnectionNotAvailable(false);
  };

  return (
      offline ? 
        <Snackbar open={connectionNotAvailable} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                Molimo vas provjerite vašu internet konekciju.
            </Alert>
        </Snackbar>
      : 
        <Snackbar open={connectionAvailable} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                Vaša internet konekcija je stabilna.
            </Alert>
        </Snackbar>
  );
}