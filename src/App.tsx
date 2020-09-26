import React, { useEffect, useState } from 'react';
import {makeStyles} from "@material-ui/core/styles"

import ImageViewer from "./components/ImageViewer"
import './App.css';
import { useImageViewerSettings, useImageDataState, useAppDispatch, useImagesPathsSettingsState } from './state/AppState';
import { useImagesDataProvider } from './services/ImagesDataProvider';
import { ImageDataStateActions } from './state/ImageDataState';
import { useImageLoadingService } from './services/ImageLoadingService';
import StackContainer from './components/StackContainer';
import Loader from './components/Loader';
import Navigator from './components/Navigator';

import {
	createMuiTheme,
	ThemeProvider,
  } from '@material-ui/core/styles';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '10vh',
	},
})

const lightTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#fff'
		},
		secondary: {
			main: '#fff'
		}
	}
  });

const darkTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#000'
		},
		secondary: {
			main: '#fff'
		}
	}
})

const App = () => {
	const classes = useStyles();

	const imaveViewerSettings = useImageViewerSettings()
	const imagesDataProvider = useImagesDataProvider()
	const imageDataState = useImageDataState()
	const appStateDispatch = useAppDispatch()
	const imageLoadingService = useImageLoadingService()
	const imagesPaths = useImagesPathsSettingsState()

	const [image, setImage] = useState<string>('');
	const [imagesPath, setImagesPath] = useState<string>(imagesPaths.landscapes.default)
	
	const handleNext = async () => {
		const imgSrc = await imageLoadingService.loadNext()
		setImage(imgSrc)
	}

	const handleBefore = async () => {
		const imgSrc = await imageLoadingService.loadBefore()
		setImage(imgSrc)
	}

	const handleItemSelected = async (index: number) => {
		const imgSrc = await imageLoadingService.loadCustom(index)
		setImage(imgSrc)
	}

	const setCurrentImage = async () => {
		if(imageDataState.imagesData.length > 0){
			const imgSrc = await imageLoadingService.loadCustom(0)
			setImage(imgSrc)
		}
	}

	const fetchImages = async () => {
		await imagesDataProvider.fetchImagesData(imagesPath)
	}

	useEffect(() => {
		const initialize = async () => {
			await imagesDataProvider.initialize()
			fetchImages()
		}

		initialize();
	}, [])

	useEffect(()=>
	{
		setCurrentImage()
	}, 
	[imageDataState.imagesData])

	useEffect(() => 
	{
		appStateDispatch({type: ImageDataStateActions.setCurrentIndex, payload: 0})
		fetchImages()
	},
	[imagesPath])

	return (
		<div className={classes.container}>
			<ThemeProvider theme={darkTheme}>
				<StackContainer
					height={imaveViewerSettings.height}
					width={imaveViewerSettings.width}
				>
					<Navigator 
						handleNext={handleNext} 
						handleBefore={handleBefore} 
						handleItemSelected={handleItemSelected}
						handleSelectPath={setImagesPath}
					/>

					<Loader/>

					
						<ImageViewer 
							imageSrc={image} 
							duration={`${imaveViewerSettings.duration/1000}s`}
							timingFunction={imaveViewerSettings.timingFunction}
						/>
						
				</StackContainer>
			</ThemeProvider>
		</div>
	)
}

export default App;

