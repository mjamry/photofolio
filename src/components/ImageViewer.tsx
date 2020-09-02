import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Loader from './Loader'
import { useAnimationState } from '../state/AppState'
import { AnimationStep } from '../state/AnimationState'
import {Theme} from '@material-ui/core'

type Props = UIProps & {
    imageSrc: string
}

type UIProps = {
    height: string,
    width: string,
    timingFunction: string,
    duration: string
}

const useStyles = makeStyles<Theme, Props>({
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
      },
    imageContainer: props => ({
        height: props.height,
        width: props.width,
        gridColumn: 1,
        gridRow: 1,
        clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)'
    }),
    loaderContainer: props => ({
        height: props.height,
        width: props.width,
        gridColumn: 1,
        gridRow: 1,
        zIndex: 999
    }),
    contentContainer: {
        display: 'grid',
        boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)",
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10vh',
    },
    animationZoomIn: {
        animationName: `$zoomIn`,
    },
    "@keyframes zoomIn": {
        from:{
            transform: 'scale(2.0)'
        },
        to: {
            transform: 'scale(1.0)'
        }
    },
    animationZoomOut: {
        animationName: `$zoomOut`,
    },
    animation: props => ({
        animationDuration: props.duration,
        animationTimingFunction: props.timingFunction,
    }),
    "@keyframes zoomOut": {
        from:{
            transform: 'scale(1.0)'
        },
        to: {
            transform: 'scale(2.0)'
        }
    }
})

const ImageViewer = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [animationClass, setAnimationClass] = useState("")
    const classes = useStyles(props);

    const animationState = useAnimationState()

    useEffect(()=>{
        setIsLoading(true);
    }, [props.imageSrc])

    useEffect(()=>{
        let animation = ""
        switch(animationState.currentStep){
            case AnimationStep.fadeIn:
                animation = classes.animationZoomOut
                break;
            case AnimationStep.fadeOut:
                animation = classes.animationZoomIn
                break;
        }
        setAnimationClass(animation)
    }, [animationState.currentStep])

    const handleIsLoaded = ():void => {
        setIsLoading(false);
    }

    return (
        <div className={classes.container}>
            <div className={classes.contentContainer}>
                <div className={classes.loaderContainer}>
                    <Loader show={isLoading}/> 
                </div>
                <div className={`${classes.imageContainer}`} >
                    <img src={props.imageSrc} 
                        className={`${classes.image} ${classes.animation} ${animationClass}`} 
                        onLoad={()=>handleIsLoaded()}
                        onError={(e)=>console.log(e)}
                        />
                </div>
            </div>
        </div>
    )
}

export default ImageViewer