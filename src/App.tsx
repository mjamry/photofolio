import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


import ImageViewer from './components/ImageViewer';
import './App.css';
import {
  useImageViewerSettings, useImageDataState, useAppDispatch, useImagesPathsSettingsState,
} from './state/AppState';
import { useImagesDataProvider } from './services/ImagesDataProvider';
import { ImageDataStateActions } from './state/ImageDataState';
import { useImageLoadingService } from './services/ImageLoadingService';
import StackContainer from './components/StackContainer';
import Loader from './components/Loader';
import Navigator from './components/Navigator';
import ThemeProvider from './ThemeProvider';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10vh',
  },
});

const App = () => {
  const classes = useStyles();

  const imageViewerSettings = useImageViewerSettings();
  const imagesDataProvider = useImagesDataProvider();
  const imageDataState = useImageDataState();
  const appStateDispatch = useAppDispatch();
  const imageLoadingService = useImageLoadingService();
  const imagesPaths = useImagesPathsSettingsState();

  const [image, setImage] = useState<string>('');
  const [imagesPath, setImagesPath] = useState<string>(imagesPaths.landscapes.default);

  const handleNext = async () => {
    const imgSrc = await imageLoadingService.loadNext();
    setImage(imgSrc);
  };

  const handleBefore = async () => {
    const imgSrc = await imageLoadingService.loadBefore();
    setImage(imgSrc);
  };

  const handleItemSelected = async (index: number) => {
    const imgSrc = await imageLoadingService.loadCustom(index);
    setImage(imgSrc);
  };

  const fetchImages = useCallback(async () => {
    await imagesDataProvider.fetchImagesData(imagesPath);
  }, [imagesDataProvider, imagesPath]);

  useEffect(() => {
    const initialize = async () => {
      await imagesDataProvider.initialize();
      fetchImages();
    };

    initialize();
  }, [fetchImages, imagesDataProvider]);

  useEffect(() => {
    const setCurrentImage = async () => {
      if (imageDataState.imagesData.length > 0) {
        const imgSrc = await imageLoadingService.loadCustom(0);
        setImage(imgSrc);
      }
    };

    setCurrentImage();
  },
  [imageDataState.imagesData, imageLoadingService]);

  useEffect(() => {
    appStateDispatch({ type: ImageDataStateActions.setCurrentIndex, payload: 0 });
    fetchImages();
  },
  [appStateDispatch, fetchImages, imagesPath]);

  return (
    <div className={classes.container}>
      <ThemeProvider>
        <StackContainer
          height={imageViewerSettings.height}
          width={imageViewerSettings.width}
        >
          <Navigator
            handleNext={handleNext}
            handleBefore={handleBefore}
            handleItemSelected={handleItemSelected}
            handleSelectPath={setImagesPath}
          />

          <Loader />

          <ImageViewer
            imageSrc={image}
            duration={`${imageViewerSettings.duration / 1000}s`}
            timingFunction={imageViewerSettings.timingFunction}
          />

        </StackContainer>
      </ThemeProvider>
    </div>
  );
};

export default App;
