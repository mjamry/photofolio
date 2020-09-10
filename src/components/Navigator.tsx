import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import ImageIndicator from './ImageIndicator'
import ImageNavigation from './ImageNavigation'
import { useImageDataState, useImagesPathsSettingsState } from '../state/AppState'
import HorizontalMenu from './HorizontalMenu'

const useStyles = makeStyles({
    container: {

    },
    imageNavigation: {

    },
    categoryNavigation: {

    },
    horizontalMenu: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		position: 'relative',
		right: 0,
		bottom: 0
	},
	verticatMenu: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
	}, 
	navigation: {
		height: '100%',
		display: 'flex',
		flexFlow: 'column',
		justifyContent: 'flex-end',
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
        <div className={classes.container}>
            <HorizontalMenu 
                handleSelected={props.handleSelectPath}
            />

            <ImageIndicator 
                numberOfItems={imageDataState.imagesData.length} 
                numberOfItemsToShow={10} 
                currentItemIndex={imageDataState.currentImageIndex}
                onClick={props.handleItemSelected} 
            />
            
            <ImageNavigation 
                numberOfItems={imageDataState.imagesData.length} 
                currentItemIndex={imageDataState.currentImageIndex} 
                next={props.handleNext} 
                before={props.handleBefore} 
            />
        </div>
    )
}

export default Navigator