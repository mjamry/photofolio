import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Theme} from '@material-ui/core'

enum LoaderActions{
    fadeIn,
    fadeOut,
    none
}

type Props = {
    action: LoaderActions,
    delayInMs: number,
    id: number,
    width: string, 
    backgroundColor: string
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
    container: props => ({
        height: '100%',
        width: props.width,
    }),
    loader: props => ({
        backgroundColor: props.backgroundColor,
    }),
    fadeInAnimation: {
        animationName: '$fadeIn',
        animationFillMode: 'both',
        animationDuration: '.5s',
        animationTimingFunction: 'cubic-bezier(.85, 0, .15, 1)',
        //animationDelay: `${props.delayInSec}s`,
    },
    fadeOutAnimation: {
        animationName: `$fadeOut`,
        animationFillMode: 'both',
        animationDuration: '.5s',
        animationTimingFunction: 'cubic-bezier(.85, 0, .15, 1)',
       // animationDelay: `${props.delayInSec}s`,
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
    },
    white: props => ({
        backgroundColor: props.backgroundColor
    })
}))

const LoaderElement = (props: Props) => {
    const classes = useStyles(props)
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
        <div className={`${classes.container} ${!isVisible && props.action !== LoaderActions.fadeIn && classes.white}`}>
            {isVisible && 
                <div className={`${classes.loader} ${props.action === LoaderActions.fadeIn ? classes.fadeInAnimation : classes.fadeOutAnimation}`} />
            }
        </div>
    )
}

export default LoaderElement
export {LoaderActions}