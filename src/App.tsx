import React, { useEffect, useState } from 'react';
import {makeStyles} from "@material-ui/core/styles"

import ImageViewer from "./components/ImageViewer"
import './App.css';
import { useImageViewerSettings, useImageDataState, useAppDispatch, useImagesPathsSettingsState } from './state/AppState';
import { useImageDataService } from './services/ImageDataService';
import { ImageDataStateActions } from './state/ImageDataState';
import { useImageLoadingService } from './services/ImageLoadingService';
import StackContainer from './components/StackContainer';
import Loader from './components/Loader';
import Navigator from './components/Navigator';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '10vh',
	},
})

const App = () => {
	const classes = useStyles();

	const imaveViewerSettings = useImageViewerSettings()
	const imageDataService = useImageDataService()
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
		await imageDataService.fetchImagesData(imagesPath)
	}

	useEffect(() => {
		const initialize = async () => {
			await imageDataService.initialize()
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
		</div>
	)
}

export default App;

