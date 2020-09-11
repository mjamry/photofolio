import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
    socialMediaMenu: {
        display: 'flex',
        flexFlow: 'row',
        fontSize: '8pt',
        textTransform: 'uppercase',
    }
})

export type Props = {
}

const SocialMediaMenu = (props: Props) => {
    const classes = useStyles()

    return (
        <div className={classes.socialMediaMenu}>
            <IconButton size="small">
                <InstagramIcon fontSize="small"/>
            </IconButton>
            <IconButton size="small">
                <FacebookIcon fontSize="small"/>
            </IconButton>
        </div>
        
    )
}

export default SocialMediaMenu

