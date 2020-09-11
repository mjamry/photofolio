import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import ImageIndicator from './ImageIndicator'
import ImageNavigation from './ImageNavigation'
import { useImageDataState, useImagesPathsSettingsState } from '../state/AppState'
import HorizontalMenu from './HorizontalMenu'
import HorizontalMenuItem, { HorizontalMenuItemPosition } from './HorizontalMenuItem'
import SocialMediaMenu from './SocialMediaMenu'

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
    socialButtons:{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    }
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
    const imagesPaths = useImagesPathsSettingsState()

    return (
        <div className={classes.navigator}>
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