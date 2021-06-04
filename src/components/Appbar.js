import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from 'react-router-dom'
import { useUsers } from '../context/UserContext';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory()
  const {authenticated, logout} = useUsers()

  let authAppbar = !authenticated ? (
    <Toolbar>
      <Button color="inherit" component={Link} to="/">
        <HomeIcon />
      </Button>
      <Button color="inherit" component={Link} to="/signup">Signup</Button>
      <Button color="inherit" component={Link} to="/login">Login</Button>
    </Toolbar>
  ) : (
    <Toolbar>
      <Button color="inherit" onClick={logout.bind(null, history)}>
        Logout <ExitToAppIcon style={{marginLeft: '.2rem'}} />
      </Button>
    </Toolbar>
  )

  return (
    <div className={classes.root}>
      <AppBar style={{color: '#fff', zIndex: '900'}} position="static">
        {authAppbar}
      </AppBar>
    </div>
  );
}
