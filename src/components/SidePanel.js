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

const useStyles = makeStyles(theme => ({
    sidePanel: {
        height: '35vh',
        width: '100vw',
        order: '1',
        background: '#f5f5f5',
        overflowY: 'scroll',
        [theme.breakpoints.up('md')]: {
            height: '100vh',
            width: '25vw',
            order: '0',
        }
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
    const {markers, circles, setMapView} = useGeometry()
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

    return (
        <Box className={classes.sidePanel}>
          <Typography variant="h6" align="center" color="secondary" className={classes.sidePanel__title}>
            Problemi na čekanju
          </Typography>
          <div className={classes.demo}>
            <List>
                {renderMarkers}
                {user && user[0].role === 'admin' && renderCircles}
            </List>
          </div>
        </Box>
    )
}

export default SidePanel
