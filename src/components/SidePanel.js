import React from 'react'
import {Box, Typography, ListItem, ListItemIcon, ListItemText, List} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useGeometry} from './../context/GeometryContext'
import ImageLightBulb from './../assets/images/Rasvjeta.svg'
import ImageTraffic from './../assets/images/Saobraćaj.svg'
import ImageNoWatter from './../assets/images/Vodosnabdijevanje.svg'
import ImageTrash from './../assets/images/Komunalni.svg'
import ImageCircleIssue from './../assets/images/problem-krug.svg'
import { useUsers } from '../context/UserContext'
import CircularProgress from './CircularProgress'

const useStyles = makeStyles(theme => ({
    sidePanel: {
        height: '45vh',
        width: '100vw',
        order: '1',
        background: '#fff',
        overflowY: 'scroll',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            height: '100vh',
            width: '60vw',
            order: '0',
        },
        [theme.breakpoints.up('md')]: {
            height: '100vh',
            width: '35vw',
            order: '0',
        },
        [theme.breakpoints.up('lg')]: {
            height: '100vh',
            width: '25vw',
            order: '0',
        }
    },
    sidePanel__close_box: {
        position: 'relative'
    },
    sidePanel__close_box_icon: {
        position: 'absolute',
        right: '.5rem',
        top: '.5rem'
    },
    sidePanel__image: {
        height: 30,
        width: 30
    },
    sidePanel__title: {
        fontFamily: 'Caveat, cursive',
        fontSize: '2rem',
        letterSpacing: '.1em',
        marginTop: '.5rem',
    },
    sidePanel__listItemPrimary: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer'
    }
}))

const SidePanel = () => {
    const classes = useStyles()
    const {geometryLoading, markers, circles, setMapView, filteredFields} = useGeometry()
    const {user} = useUsers()

    const renderMarkers = markers.map(marker => {
        let image

        switch(marker.category) {
            case 'Rasvjeta':
                image = ImageLightBulb
            break;

            case 'Saobraćaj':
                image = ImageTraffic
            break;

            case 'Vodosnabdijevanje':                                                                                                                                                                                                                                                                                  
                image = ImageTrash
            break;

            case 'Komunalni':                                                                                                                                                                                                                                                                                  
                image = ImageNoWatter
            break;

            default: return marker.category;
        }

        return (
            <ListItem key={marker._id} style={{cursor: 'pointer'}} onClick={() => setMapView(marker.latLng)}>
                <ListItemIcon>
                    <img src={image} alt={`${marker.category}`} className={classes.sidePanel__image} />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={<Typography className={classes.sidePanel__listItemPrimary} >{marker.description}</Typography>}
                />
            </ListItem>
        )
    })

    const renderCircles = circles.map(circle => {
        return (
            <ListItem key={circle._id} style={{cursor: 'pointer'}} onClick={() => setMapView(circle.coordinates)}>
                <ListItemIcon>
                    <img src={ImageCircleIssue} alt="circle" className={classes.sidePanel__image} />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={<Typography className={classes.sidePanel__listItemPrimary} >{circle.description}</Typography>}
                />
            </ListItem>
        )
    })

    const content = !geometryLoading ? (
        <>
          <Typography variant="h6" align="center" color="secondary" className={classes.sidePanel__title}>
            Problemi na čekanju
          </Typography>
          <div className={classes.demo}>
            <List>
                {filteredFields.markers && renderMarkers}
                {filteredFields.circles && user && user[0].role === 'admin' && renderCircles}
            </List>
          </div>
        </>
    ) : <CircularProgress />

    return (
        <Box className={classes.sidePanel}>
            {content}
        </Box>
    )
}

export default SidePanel
