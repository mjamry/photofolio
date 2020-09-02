import React, { useEffect, useState } from 'react';
import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import IconButton from "@material-ui/core/IconButton"
import ImageViewer from "./components/ImageViewer"
import './App.css';
import { useImageViewerSettings, useImageDataState, useAppDispatch, useImagesPathsSettingsState } from './state/AppState';
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
    flexDirection: 'row',
    top: '20px',
    justifyContent: 'flex-start',
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

  const imaveViewerSettings = useImageViewerSettings()
  const imageDataService = useImageDataService()
  const imageDataState = useImageDataState()
  const appStateDispatch = useAppDispatch()
  const imagesPaths = useImagesPathsSettingsState()

  const [image, setImage] = useState<string>('');
  const [imagesPath, setImagesPath] = useState<string>(imagesPaths.landscapes.default)

  
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
      await imageDataService.fetchImagesData(imagesPath)
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

  useEffect(() => {
    imageDataService.fetchImagesData(imagesPath)
   console.log(imagesPath)
  },
  [imagesPath])

  return (
    <div>
      <div className={classes.horizontalMenu}>
        <Button>About</Button>
        <Button>Contact</Button>

      </div>
      <div className={classes.verticatMenu}>
        <Button onClick={()=>setImagesPath(imagesPaths.landscapes.default)}>Landscapes</Button>
        <Button onClick={()=>setImagesPath(imagesPaths.people.default)}>People</Button>
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

