import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
    marginTop: '.5rem',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    zIndex: 1500,
    textAlign: 'center'
  },
})

export default function AlertDialog({children, type, isOpen = true, width = '80%', timer = 7}) {
  const classes = useStyles();
  const [dissapearAfter, setDissapearAfter] = useState(false)

  useEffect(() => {
   const timeout = setTimeout(() => {
      setDissapearAfter(true)
    }, timer * 1000)

    return () => clearTimeout(timeout)
  }, [timer])

  const content = isOpen && !dissapearAfter ? (
    <div className={classes.root} style={{width}}>
      <Alert severity={type} variant="filled">{children}</Alert>
    </div>
  ) : null

  return content
}
