import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Theme} from '@material-ui/core'
import { ImageLoadingStep } from '../state/ImageLoadingState';

type Props = UIProps & {
    action: ImageLoadingStep,
}

type UIProps = {
    delay: string,
    duration: string,
    color: string,
    width: string,
    timingFunction: string,
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
        animationTimingFunction: props.timingFunction,
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
    const animationClass = props.action === ImageLoadingStep.preLoading ? classes.fadeInAnimation : classes.fadeOutAnimation

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