import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem'
import {useGeometry} from './../context/GeometryContext'
import {ValidateIsEmpty} from './../utils/helpers'
import AlertDialog from './AlertDialog';
import Loader from './CircularProgress'
import * as factory from './../utils/factory'
import { makeStyles } from '@material-ui/core/styles';

const categories = [
  {
    value: 'Rasvjeta',
    label: 'Rasvjeta'
  },
  {
    value: 'Saobraćaj',
    label: 'Saobraćaj'
  },
  {
    value: 'Vodosnabdijevanje',
    label: 'Vodosnabdijevanje'
  },
  {
    value: 'Komunalni',
    label: 'Komunalni'
  }
]

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    width: '100%'
  }
}))

export default function FormDialog({open, setIsOpen, fields, setFields, mapEvent}) {
  const [alertOpen, setAlertOpen] = useState(false)
  const [requestSucceded, setRequestSucceded] = useState(false)
  const {geometryLoading, setGeometryLoading} = useGeometry()
  const classes = useStyles()

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

  const handleImageChange = () => {
    const file = document.getElementById('photo');
    file.click();
  };

  const handleImage = e => {
    image = e.target.files[0]
    setFields({
      ...fields,
      photo: image
    })
  };

  const handleRequest = () => {
    setRequestSucceded(true)
  }

  let image;
  const formData = new FormData()

  const handleSubmit = (e) => {
    // 0) Do other stuff
    e.preventDefault()
    formData.append('name', fields.name)
    formData.append('sender', fields.sender)
    formData.append('description', fields.description)
    formData.append('category', fields.category)
    formData.append('photo', fields.photo); 

    const dataArr = [...formData]
    const data = Object.fromEntries(dataArr)
    const {category, description} = data
    
    // 1) Check if the fields are empty
    if(!ValidateIsEmpty(category, description)) {
      setAlertOpen(true)
      setTimeout(() => {
        setAlertOpen(false)
      }, 7000)
      return
    }

    // 2) & 3) Create marker in DB / Close dialog
    factory.createMarker(mapEvent, setGeometryLoading, handleClose, handleRequest, formData)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" PaperProps={{classes: {root: classes.paper}}}>
        {!geometryLoading ? 
      <>
        <DialogTitle id="form-dialog-title">Potvrda</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Da li želite potvrditi odabranu lokaciju?
          </DialogContentText>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
              label="Ime (opcionalno)"
              type="text"
              value={fields.name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              margin="dense"
              name="sender"
              id="sender_id"
              label="E-Mail (opcionalno)"
              type="email"
              value={fields.sender}
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

            <input
              name="photo"
              id="photo"
              hidden="hidden"
              type="file"
              onChange={handleImage}
            />

            <Button
              color="secondary"
              variant="contained"
              style={{color: '#fff'}}
              onClick={handleImageChange}
            >
              Učitaj Fotografiju
            </Button>

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
