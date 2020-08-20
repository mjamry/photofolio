import React from 'react';
import {makeStyles} from '@material-ui/core/styles'

enum LoaderActions{
    fadeIn,
    fadeOut,
    none
}

type Propsa = {
    action: LoaderActions
}

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    loader: {
        backgroundColor: 'black',
        width: '50%',
    },
    fadeIn: {
        animation: `$fadeIn .75s cubic-bezier(.85, 0, .15, 1)`,
        height: '100%',
    },
    fadeOut: {
        animation: `$fadeOut .75s cubic-bezier(.85, 0, .15, 1)`,
        height: '0'
    },
    "@keyframes fadeIn": {
        from: {
            height: '0'
        },
        to: {
            height: '100%'
        }
    },
    "@keyframes fadeOut": {
        from: {
            height: '100%'
        },
        to: {
            height: '0'
        }
    }
})

const Loader = (props: Propsa) => {
    const classes = useStyles()
    console.log(props.action)
    return (
        <div className={classes.container}>
            <div className={`${classes.loader} ${props.action === LoaderActions.fadeIn ? classes.fadeIn : classes.fadeOut}`}>.</div>
        </div>
    )
}

export default Loader
export {LoaderActions}