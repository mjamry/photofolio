import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Theme} from '@material-ui/core'

import {AnimationStep} from './../state/StateTypes'

type Props = UIProps & {
    action: AnimationStep,
    id: number,
}

type UIProps = {
    delay: string,
    duration: string,
    color: string,
    width: string,
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
    container: props => ({
        height: '100%',
        width: props.width,
    }),
    loader: props => ({
        backgroundColor: props.color,
    }),
    animation: props => ({
        animationFillMode: 'both',
        animationDuration: props.duration,
        animationTimingFunction: 'cubic-bezier(.85, 0, .15, 1)',
        animationDelay: props.delay,
    }),
    fadeInAnimation: {
        animationName: '$fadeIn',
    },
    fadeOutAnimation: {
        animationName: `$fadeOut`,
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
}))

const LoaderElement = (props: Props) => {
    const classes = useStyles(props)
    const animationClass = props.action === AnimationStep.fadeIn ? classes.fadeInAnimation : classes.fadeOutAnimation

   // console.log(new Date().toISOString()+` | ${props.id} ${props.delay} ${props.duration} ${props.action} `)


    return (
        <div className={classes.container}>
                <div className={`
                ${classes.loader} 
                ${animationClass}
                ${classes.animation}`} 
                />
        </div>
    )
}

export default LoaderElement