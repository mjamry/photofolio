import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles'

enum LoaderActions{
    fadeIn,
    fadeOut,
    none
}

type Props = {
    action: LoaderActions,
    delayInMs: number,
    id: number,
}

const useStyles = makeStyles({
    container: {
        height: '100%',
        width: '25%',
    },
    loader: {
        backgroundColor: 'black',
    },
    fadeInAnimation: {
        animationName: `$fadeIn`,
        animationFillMode: 'both',
        animationDuration: '.75s',
        animationTimingFunction: 'cubic-bezier(.85, 0, .15, 1)',
    },
    fadeOutAnimation: {
        animationName: `$fadeOut`,
        animationFillMode: 'both',
        animationDuration: '.75s',
        animationTimingFunction: 'cubic-bezier(.85, 0, .15, 1)',
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
        console.log(new Date().toISOString()+` display ${props.id}, action: ${props.action}`)
    }

    useEffect(() => {
        let timer = setTimeout(()=>show(), props.delayInMs)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <div className={`${classes.container}`}>
            {isVisible && 
                <div className={`${classes.loader} ${props.action === LoaderActions.fadeIn ? classes.fadeInAnimation : classes.fadeOutAnimation}`} />
            }
        </div>
    )
}

export default LoaderElement
export {LoaderActions}