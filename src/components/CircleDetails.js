import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  details__box: {
    width: '100%',
    height: 450
  },
  details__image: {
    borderRadius: '.3rem',
    width: '100%',
    height: '95%',
    [theme.breakpoints.up('sm')]: {
      width: 400
    }
  },
  paper: {
    maxWidth: 448
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CircleDetails({isOpen, onHandleClose, selectedCircle}) {
  const classes = useStyles()
  
  return (
    <div>
      <Dialog
        PaperProps={{classes: {root: classes.paper}}}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onHandleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Problem</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {selectedCircle && selectedCircle.description}
            </DialogContentText>
          <DialogContentText style={{fontWeight: 'bold'}} id="alert-dialog-slide-description">
            Fotografija:
          </DialogContentText>
          <Box className={classes.details__box}>
            <img src={selectedCircle && selectedCircle.image} alt="road accident" className={classes.details__image} />
            <a href={selectedCircle && selectedCircle.image} target="__blank">{selectedCircle && !selectedCircle.image.endsWith('qxymgr.png') && 'Link fotografije'}</a>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onHandleClose} color="secondary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
