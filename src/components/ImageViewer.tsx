import React, { useEffect, useState, useRef } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Loader from './Loader'
import { useImageLoadingState } from '../state/AppState'
import { ImageLoadingStep } from '../state/ImageLoadingState'
import {Theme} from '@material-ui/core'

import { useImageLoadingService } from '../services/ImageLoadingService'

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
    const classes = useStyles(props);
    const imageRef = useRef<HTMLImageElement>(null)
    const [animationClass, setAnimationClass] = useState("")

    const imageLoading = useImageLoadingState()
    const imageLoadingService = useImageLoadingService()
 
    useEffect(() =>{
        const load = async () => 
        {
            const result = await imageLoadingService.loadImage(props.imageSrc)
            imageRef.current!.src = result
        }

        load()
    }, [props.imageSrc])

    useEffect(()=>{
        let animation = ""
        switch(imageLoading.currentStep){
            case ImageLoadingStep.preLoading:
                animation = classes.animationZoomOut
                break;
            case ImageLoadingStep.postLoading:
                animation = classes.animationZoomIn
                break;
        }
        setAnimationClass(animation)

    }, [imageLoading.currentStep])

    return (
        <div className={classes.contentContainer}>
            <div className={classes.loaderContainer}>
                <Loader/> 
            </div>
            <div className={`${classes.imageContainer}`} >
                <img 
                    ref={imageRef}
                    className={`${classes.image} ${classes.animation} ${animationClass}`} 
                />
            </div>
        </div>
    )
}

export default ImageViewer