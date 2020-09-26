import React from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button/Button'
import { useImagesPathsSettingsState } from '../state/AppState'
import HorizontalMenuItem, { HorizontalMenuItemPositionProps, HorizontalMenuItemPosition } from './HorizontalMenuItem'
import {fade} from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles((theme: Theme) => ({
    horizontalMenu: {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${fade(theme.palette.primary.main, .25)}`,
        padding: '20px',
        color: theme.palette.primary.main,
    },
    leftMenu: {
        display: 'flex',
        flexFlow: 'row',
    },
    rightMenu: {
        display: 'flex',
        flexFlow: 'row',
    },
    centerMenu: {
        display: 'flex',
        flexFlow: 'row',

    }
}))

export type Props = {
    children: React.ReactElement<HorizontalMenuItemPositionProps> | React.ReactElement<HorizontalMenuItemPositionProps>[]
}

const HorizontalMenu = (props: Props) => {
    const classes = useStyles()
    
    return (
        <div className={classes.horizontalMenu}>    

            <div className={classes.leftMenu}>
                {React.Children.map(props.children, child => {
                    return child.props.position === HorizontalMenuItemPosition.left ? child : null
                })}
            </div>

            <div className={classes.centerMenu}>
                {React.Children.map(props.children, child => {
                    return child.props.position === HorizontalMenuItemPosition.center ? child : null
                })}
            </div>

            <div className={classes.rightMenu}>
                {React.Children.map(props.children, child => {
                    return child.props.position === HorizontalMenuItemPosition.right ? child : null
                })}
            </div>
        </div>
    )
}

export default HorizontalMenu

