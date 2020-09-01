import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {makeStyles} from '@material-ui/core/styles'
import Loader from './Loader'
import { useAnimationState } from '../state/AppState'
import { AnimationStep } from '../state/AnimationState'

type Props = {
    imageSrc: string
}

//image loading progress
interface Image {
    load(url: string): void;
  }
  
  Image.prototype.load = function(url : string){
    var thisImg = this;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url, true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
        var blob = new Blob([this.response]);
        thisImg.src = window.URL.createObjectURL(blob);
    };
    xmlHTTP.onprogress = function(e: any) {
        thisImg.completedPercentage = parseInt(`${(e.loaded / e.total) * 100}`);
    };
    xmlHTTP.onloadstart = function() {
        thisImg.completedPercentage = 0;
    };
    xmlHTTP.send();
  };
  
  Image.prototype.completedPercentage = 0;
  
  const SETTINGS = {
      height: '80vh',
      width: 'calc(80vh*1.5)',
  }

const useStyles = makeStyles({
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
      },
    imageContainer: {
        height: SETTINGS.height,
        width: SETTINGS.width,
        gridColumn: 1,
        gridRow: 1,
        clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)'
    },
    loaderContainer: {
        height: SETTINGS.height,
        width: SETTINGS.width,
        gridColumn: 1,
        gridRow: 1,
        zIndex: 999
    },
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
        animationDuration: '.7s',
        animationTimingFunction: 'cubic-bezier(.90, 0, .30, 1)',
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
        animationDuration: '.7s',
        animationTimingFunction: 'cubic-bezier(.30, 0, .90, 1)',
    },
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
        console.log("Image: "+animation)
    }, [animationState.currentStep])

    const handleIsLoaded = ():void => {
        setIsLoading(false);
    }

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.contentContainer}>
                <div className={classes.loaderContainer}>
                    <Loader show={isLoading}/> 
                </div>
                <div className={`${classes.imageContainer}`} >
                    <img src={props.imageSrc} 
                        className={`${classes.image} ${animationClass}`} 
                        onLoad={()=>handleIsLoaded()}
                        onError={(e)=>console.log(e)}
                        />
                </div>
            </div>
        </div>
    )
}

export default ImageViewer