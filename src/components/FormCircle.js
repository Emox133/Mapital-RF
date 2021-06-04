import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useGeometry} from './../context/GeometryContext'
import {ValidateIsEmpty} from './../utils/helpers'
import AlertDialog from './AlertDialog';
import Loader from './CircularProgress'
import * as factory from './../utils/factory'

export default function FormDialog({open, setIsOpen, fields, setFields, mapEvent}) {
  const [alertOpen, setAlertOpen] = useState(false)
  const [requestSucceded, setRequestSucceded] = useState(false)
  const {geometryLoading, setGeometryLoading} = useGeometry()
  
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setFields({
        name: '',
        description: '',
        sender: '',
        category: 'Rasvjeta',
      })
    }, 1000)
  };

  const handleChange = (e) => {
    setFields(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleRequest = () => {
    setRequestSucceded(true)
  }

  const handleSubmit = (e) => {
    // 0) Do other stuff
    e.preventDefault()
    const {description} = fields
    
    // 1) Check if the fields are empty
    if(!ValidateIsEmpty(description)) {
      setAlertOpen(true)
      setTimeout(() => {
        setAlertOpen(false)
      }, 7000)
      return
    }

    // 2) & 3) Create marker in DB / Close dialog
    factory.createCircle(mapEvent, description, setGeometryLoading, handleRequest, handleClose)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {!geometryLoading ? 
      <>
        <DialogTitle id="form-dialog-title">Potvrda</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Da li želite potvrditi odabranu lokaciju?
          </DialogContentText>
          <form  onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              id="description-id"
              name="description"
              label="Opis događaja"
              style={{marginBottom: '1rem'}}
              type="text"
              value={fields.description}
              fullWidth
              multiline={true}
              rows={5}
              onChange={handleChange}
            />

            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form> 
        </DialogContent>
        </>
        : <Loader />}
      </Dialog>
      {alertOpen &&
        <AlertDialog type="error">
          Molimo vas ispunite polja ispod.
       </AlertDialog>}
      {requestSucceded &&
        <AlertDialog>
          Vaš zahtjev je uspiješno proslijeđen.
        </AlertDialog>}
    </div>
  );
}
