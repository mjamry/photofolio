import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles'

enum LoaderActions{
    fadeIn,
    fadeOut,
    none
}

type Props = {
    action: LoaderActions,
    delayInMs: number
}

const useStyles = makeStyles({
    container: {
        height: '100%',
        width: '25%',
    },
    loader: {
        backgroundColor: 'black',
    },
    hidden: {
        display: 'none'
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

const LoaderElement = (props: Props) => {
    const classes = useStyles()
    const [isVisible, setIsVisible] = useState(false)

    const show = () => {
        setIsVisible(true)
        console.log("visible");
    }

    useEffect(() => {
        let timer = setTimeout(()=>show(), props.delayInMs)
        console.log(timer)
        console.log(props.delayInMs)
        return () => {
            clearTimeout(timer)
        }
    }, [props.action])

    return (
        <div className={`${classes.container} ${!isVisible && classes.hidden}`}>
            <div className={`${classes.loader} ${props.action === LoaderActions.fadeIn ? classes.fadeIn : classes.fadeOut}`}>.</div>
        </div>
    )
}

export default LoaderElement
export {LoaderActions}