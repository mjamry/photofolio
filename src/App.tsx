import React, { useEffect, useState } from 'react';
import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import IconButton from "@material-ui/core/IconButton"
import ImageViewer from "./components/ImageViewer"
import './App.css';
import { useImageViewerSettings, useImageDataState, useAppDispatch, useImagesPathsSettingsState } from './state/AppState';
import { useImageDataService } from './services/ImageDataService';
import { ImageDataStateActions } from './state/ImageDataState';
import ImageNavigation from './components/ImageNavigation';
import ImageIndicator from './components/ImageIndicator';
import { useImageLoadingService } from './services/ImageLoadingService';

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
	navigation: {
		position: 'fixed',
		width: '100vw',
		left: '25px',
		bottom: '20px',
	},
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
	const imagesPaths = useImagesPathsSettingsState()
	const imageLoadingService = useImageLoadingService()

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
		<div>
			<div className={classes.horizontalMenu}>
				<Button>About</Button>
				<Button>Contact</Button>

			</div>
			<div className={classes.verticatMenu}>
				<Button onClick={()=>setImagesPath(imagesPaths.landscapes.default)}>Landscapes</Button>
				<Button onClick={()=>setImagesPath(imagesPaths.people.default)}>People</Button>
			</div>

			<div className={classes.container}>

				<ImageViewer 
					imageSrc={image} 
					height={imaveViewerSettings.height}
					width={imaveViewerSettings.width}
					duration={`${imaveViewerSettings.duration/1000}s`}
					timingFunction={imaveViewerSettings.timingFunction}
				/>

				<div className={classes.navigation}>
					<ImageIndicator 
						numberOfItems={imageDataState.imagesData.length} 
						numberOfItemsToShow={10} 
						currentItemIndex={imageDataState.currentImageIndex}
						onClick={handleItemSelected} 
					/>
					<ImageNavigation 
						numberOfItems={imageDataState.imagesData.length} 
						currentItemIndex={imageDataState.currentImageIndex} 
						next={handleNext} 
						before={handleBefore} 
					/>
				</div>
			</div>
		</div>
	)
}

export default App;

