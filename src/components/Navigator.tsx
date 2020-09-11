import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import ImageIndicator from './ImageIndicator'
import ImageNavigation from './ImageNavigation'
import { useImageDataState, useImagesPathsSettingsState } from '../state/AppState'
import HorizontalMenu from './HorizontalMenu'

const useStyles = makeStyles({
    navigator: {
        height: '100%',
        width: '100%',
        position: 'relative',
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
})

export type Props = {
    handleNext: () => void,
    handleBefore: () => void,
    handleItemSelected: (index: number) => void,
    handleSelectPath: (path: string) => void
}

const Navigator = (props: Props) => {
    const classes = useStyles()

    const imageDataState = useImageDataState()

    return (
        <div className={classes.navigator}>
            <HorizontalMenu 
                handleSelected={props.handleSelectPath}
            />

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
        </div>
    )
}

export default Navigator