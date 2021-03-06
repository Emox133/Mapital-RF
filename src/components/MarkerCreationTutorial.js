import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { useTheme } from '@material-ui/core/styles';
import YoutubeEmbed from './YoutubeEmbeed';

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box onClick={handleClickOpen}>
        <NotListedLocationIcon />
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Kako prijaviti problem"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Na videu ispod možete pogledati kako da prijavite problem i time doprinesete
            gradu Živinice!
          </DialogContentText>
          <YoutubeEmbed embedId="QUdeYiyMg_Q" />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
