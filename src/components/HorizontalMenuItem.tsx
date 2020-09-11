import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    horizontalMenuItem: {
        paddingLeft: '10px',
        paddingRight: '10px',
        textTransform: 'uppercase',
        fontSize: '8pt',
    },
    activeItem: {
        '&::before':{
            borderLeft: '1px solid white',
        },
        cursor: 'pointer',
    }
})

export type HorizontalMenuItemPositionProps = {
    title: string,
    onClick?: () => void,
    position: HorizontalMenuItemPosition,
}

export enum HorizontalMenuItemPosition {
    right,
    left,
    center
}

const HorizontalMenuItem = (props: HorizontalMenuItemPositionProps) => {
    const classes = useStyles()

    return (
        <div 
            className={`${classes.horizontalMenuItem} ${props.onClick ? classes.activeItem : ""}`}
            onClick={props.onClick}
        >
            {props.title}
        </div>
    )
}

export default HorizontalMenuItem

