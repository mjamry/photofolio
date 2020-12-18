import React, { useEffect, useState } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ImageIndicator from './ImageIndicator'
import ImageNavigation from './ImageNavigation'
import { useImageDataState, useImagesPathsSettingsState, useImageLoadingState, useImageViewerSettings } from '../state/AppState'
import HorizontalMenu from './HorizontalMenu'
import HorizontalMenuItem, { HorizontalMenuItemPosition } from './HorizontalMenuItem'
import SocialMediaMenu from './SocialMediaMenu'
import { ImageLoadingStep } from '../state/ImageLoadingState'
import { Theme } from '../ThemeProvider'

const useStyles = makeStyles<Theme, UIProps>({
    navigator: {
        height: '100%',
        width: '100%',
        position: 'relative',
    },
    hidden: {
        display: 'none',
    },
    imageNavigation: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
        position: 'absolute',
        bottom: '10px',
        right: '50px'
    },
    indicator: {
        position: 'absolute',
        top: '20%',
        left: '0',
    },
    socialButtons:{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    },

    animation: props => ({
        animationFillMode: 'both',
        animationDuration: `${props.duration/1000}s`,
        animationTimingFunction: props.timingFunction,
    }),
    fadeInAnimation: {
        animationName: '$fadeIn',
    },
    fadeOutAnimation: {
        animationName: `$fadeOut`,
    },
    "@keyframes fadeIn": {
        from: {
            opacity: '0'
        },
        to: {
            opacity: '1'
        }
    },
    "@keyframes fadeOut": {
        from: {
            opacity: '1'
        },
        to: {
            opacity: '0'
        }
    },
})

export type Props = {
    handleNext: () => void,
    handleBefore: () => void,
    handleItemSelected: (index: number) => void,
    handleSelectPath: (path: string) => void
}

type UIProps = {
    duration: number,
    timingFunction: string,
}

const Navigator = (props: Props) => {
    const imageViewerSettings = useImageViewerSettings()
    const classes = useStyles(imageViewerSettings as UIProps)
    const [animation, setAnimation] = useState("")

    const imageDataState = useImageDataState()
    const imagesPaths = useImagesPathsSettingsState()
    const imageLoadingState = useImageLoadingState()

    useEffect(() => {
        switch(imageLoadingState.currentStep) {
            case ImageLoadingStep.preLoading:
                setAnimation(classes.fadeOutAnimation)
                break
            case ImageLoadingStep.postLoading:
                setAnimation(classes.fadeInAnimation)
                break
        }
    }, [classes.fadeInAnimation, classes.fadeOutAnimation, imageLoadingState.currentStep])

    return (
        <div className={`
            ${classes.navigator} 
            ${animation}
            ${classes.animation}`} 
        >
            <HorizontalMenu>
                <HorizontalMenuItem 
                    title="Michal Jamry Photo" 
                    position={HorizontalMenuItemPosition.left} 
                />
                <HorizontalMenuItem 
                    title="Landscapes" 
                    onClick={()=>props.handleSelectPath(imagesPaths.landscapes.default)} 
                    position={HorizontalMenuItemPosition.left} 
                />
                <HorizontalMenuItem 
                    title="People" 
                    onClick={()=>props.handleSelectPath(imagesPaths.people.default)} 
                    position={HorizontalMenuItemPosition.left} 
                />
                <HorizontalMenuItem 
                    title="About" 
                    onClick={()=>console.log("About")} 
                    position={HorizontalMenuItemPosition.right} 
                />
                <HorizontalMenuItem 
                    title="Contact" 
                    onClick={()=>console.log("Contact")} 
                    position={HorizontalMenuItemPosition.right} 
                />
            </HorizontalMenu>

            <div className={classes.indicator}>
                <ImageIndicator 
                    numberOfItems={imageDataState.imagesData.length} 
                    numberOfItemsToShow={10} 
                    currentItemIndex={imageDataState.currentImageIndex}
                    onClick={props.handleItemSelected} 
                />
            </div>

            <div className={classes.imageNavigation}>
                <ImageNavigation 
                    numberOfItems={imageDataState.imagesData.length} 
                    currentItemIndex={imageDataState.currentImageIndex} 
                    next={props.handleNext} 
                    before={props.handleBefore} 
                />
            </div>

            <div className={classes.socialButtons}>
                <SocialMediaMenu />
            </div>
        </div>
    )
}

export default Navigator