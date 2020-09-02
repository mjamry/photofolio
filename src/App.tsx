import React, { useEffect, useState } from 'react';
import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import IconButton from "@material-ui/core/IconButton"
import ImageViewer from "./components/ImageViewer"
import './App.css';
import { useImageViewerSettings, useImageDataState, useAppDispatch } from './state/AppState';
import { useImageDataService } from './services/ImageDataService';
import { ImageDataStateActions } from './state/ImageDataState';

const useStyles = makeStyles({
  horizontalMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'fixed',
    top: '25px',
    right: '150px',
    width: '10vw'
  },
  verticatMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    top: 0,
    left: '20px',
    position: 'fixed',
  }, 

  downButton: {
    position: 'fixed',
    width: '100vw',
    height: '20px',
    bottom: '50px',
    textAlign: 'center'
  }
})

const App = () => {
  const classes = useStyles();
  const [image, setImage] = useState<string>("");

  const imaveViewerSettings = useImageViewerSettings()
  const imageDataService = useImageDataService()
  const imageDataState = useImageDataState()
  const appStateDispatch = useAppDispatch()
  
  const handleDownButtonClick = () => {
    const newIndex = imageDataState.currentImageIndex + 1
    appStateDispatch({type: ImageDataStateActions.setCurrentIndex, payload: newIndex})
  }

  const setCurrentImage = () => {
    if(imageDataState.imagesData.length > 0){
      setImage(imageDataState.imagesData[imageDataState.currentImageIndex].webContentLink)
    }
  }

  useEffect(() => {
    const initialize = async () => {
      await imageDataService.initialize()
      await imageDataService.fetchImagesData('')
    }

    initialize();
  }, [])

  useEffect(()=>
  {
    appStateDispatch({type: ImageDataStateActions.setCurrentIndex, payload: 0})
    setCurrentImage()
  }, 
  [imageDataState.imagesData])

  useEffect(() => 
  {
    setCurrentImage()
  }, 
  [imageDataState.currentImageIndex])

  return (
    <div>
      <div className={classes.horizontalMenu}>
        <Button>About</Button>
        <Button>Contact</Button>

      </div>
      <div className={classes.verticatMenu}>
        <Button>Landscapes</Button>
        <Button>People</Button>
      </div>

      <ImageViewer 
        imageSrc={image} 
        height={imaveViewerSettings.height}
        width={imaveViewerSettings.width}
        duration={`${imaveViewerSettings.duration/1000}s`}
        timingFunction={imaveViewerSettings.timingFunction}
      />

      <div className={classes.downButton}>
        <IconButton onClick={()=>handleDownButtonClick()}>
          <ExpandMoreIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}

export default App;

