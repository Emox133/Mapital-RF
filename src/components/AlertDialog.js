import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    marginTop: '.5rem',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    zIndex: 1000,
  },
}))

export default function AlertDialog({children, type, isOpen, timer = 5000}) {
  const classes = useStyles();

  const content = isOpen ? (
    <div className={classes.root}>
      <Alert severity={type} variant="filled" onClose={() => {}}>{children}</Alert>
    </div>
  ) : null

  return content
}
