import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import { IconButton } from '@material-ui/core'
import {Theme} from '../ThemeProvider'

const useStyles = makeStyles((theme: Theme) => ({
    socialMediaMenu: {
        display: 'flex',
        flexFlow: 'row',
        fontSize: '8pt',
        textTransform: 'uppercase',
    },
    iconButton: {
        color: theme.palette.primary.main
    }
}))

export type Props = {
}

const SocialMediaMenu = (props: Props) => {
    const classes = useStyles()

    return (
        <div className={classes.socialMediaMenu}>
            <IconButton size="small" className={classes.iconButton}>
                <InstagramIcon fontSize="small"/>
            </IconButton>
            <IconButton size="small" className={classes.iconButton}>
                <FacebookIcon fontSize="small"/>
            </IconButton>
        </div>
        
    )
}

export default SocialMediaMenu

