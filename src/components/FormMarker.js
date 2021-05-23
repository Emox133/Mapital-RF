import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem'
import {useMediaQuery} from '@material-ui/core'
import {ValidateIsEmpty} from './../utils/helpers'
import AlertDialog from './AlertDialog';
import * as factory from './../utils/factory'
// import {palette} from '@material-ui/system'

const categories = [
  {
    value: 'Infrastrukturni Problem',
    label: 'Infrastrukturni Problem'
  },
  {
    value: 'Saobraćajna Nezgoda',
    label: 'Saobraćajna Nezgoda'
  },
  {
    value: 'Opasne Lokacije',
    label: 'Opasne Lokacije'
  }
]

export default function FormDialog({open, setIsOpen, fields, setFields, mapEvent}) {
  const [alertOpen, setAlertOpen] = useState(false)
  const [requestSucceded, setRequestSucceded] = useState(false)
  const isActive = useMediaQuery('(max-width: 600px)')

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setFields({
        name: '',
        email: '',
        category: 'Infrastrukturni Problem'
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
    setTimeout(() => {
      setRequestSucceded(false)
    }, 3000)
  }

  const handleSubmit = (e) => {
    // 0) Do other stuff
    e.preventDefault()
    const {name, email, category, description} = fields
    
    // 1) Check if the fields are empty
    if(!ValidateIsEmpty(name, email, category, description)) {
      setAlertOpen(true)
      setTimeout(() => {
        setAlertOpen(false)
      }, 7000)
      return
    }

    // 2) & 3) Create marker in DB / Close dialog
    factory.createMarker(mapEvent, handleClose, handleRequest, category)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Potvrda</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Da li želite potvrditi odabranu lokaciju?
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              id="standard-select-category"
              name="category"
              fullWidth
              select
              label="Vrsta Problema"
              value={fields.category}
              onChange={handleChange}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              margin="dense"
              id="name-id"
              name="name"
              label="Ime"
              type="text"
              value={fields.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="email"
              id="mail"
              label="E-Mail"
              type="email"
              value={fields.email}
              onChange={handleChange}
              fullWidth
            />
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
      </Dialog>
      {alertOpen &&
        <AlertDialog type="error" width="50%">
          Molimo vas ispunite polja ispod.
       </AlertDialog>}
      {requestSucceded &&
        <AlertDialog  width={isActive ? '70%' : '25%'}>
          Vaš zahtjev je uspiješno proslijeđen.
        </AlertDialog>}
    </div>
  );
}
