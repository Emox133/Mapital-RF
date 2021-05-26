import React from 'react'
import {Box, Typography, ListItem, ListItemIcon, ListItemText, List} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useGeometry} from './../context/GeometryContext'
import ImageIP from './../assets/images/Infrastrukturni Problem.svg'
import ImageOL from './../assets/images/Opasne Lokacije.svg'
import ImageSN from './../assets/images/Saobraćajna Nezgoda.svg'

const useStyles = makeStyles(theme => ({
    sidePanel: {
        height: '55vh',
        width: '100vw',
        background: '#f5f5f5',
        overflowY: 'scroll',
        [theme.breakpoints.up('sm')]: {
            height: '100vh',
            width: '25vw'
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
    const {markers, setMarkerView} = useGeometry()

    const content = markers.map(marker => {
        let image

        switch(marker.category) {
            case 'Infrastrukturni Problem':
                image = ImageIP
            break;

            case 'Saobraćajna Nezgoda':
                image = ImageSN
            break;

            case 'Opasne Lokacije':                                                                                                                                                                                                                                                                                  
                image = ImageOL
            break;

            default: return marker.category;
        }

        return (
            <ListItem key={marker._id} style={{cursor: 'pointer'}} onClick={() => setMarkerView(marker.latLng)}>
                <ListItemIcon>
                    <img src={image} alt={`${marker.category}`} className={classes.sidePanel__image} />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={<Typography className={classes.sidePanel__listItemPrimary} >{marker.description}</Typography>}
                    // secondary=""
                />
            </ListItem>
        )
    })

    return (
        <Box className={`sidepanel--hidden ${classes.sidePanel}`}>
          <Typography variant="h6" align="center" color="primary" className={classes.sidePanel__title}>
            Sva Dešavanja
          </Typography>
          <div className={classes.demo}>
            <List>
                {content}
            </List>
          </div>
        </Box>
    )
}

export default SidePanel