import React, { useState, useEffect } from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import LoaderElement from './LoaderElement';
import CircularProgress from '@material-ui/core/CircularProgress'
import {useImageLoadingState, useAppDispatch, useLoaderSettingsState} from './../state/AppState'
import { ImageLoadingStep, ImageLoadingStateActions } from '../state/ImageLoadingState';
import { LoaderSettingsState } from '../state/SettingsState';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexFlow: 'row',
        height: '100%',
    },
    loaderContainer: props => ({
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
}))

const Loader = () => {
 
    const imageLoading = useImageLoadingState()
    const loaderSettings = useLoaderSettingsState()

    const classes = useStyles(loaderSettings)

    const renderElements = (numberOfElements: number, action: ImageLoadingStep):React.ReactNode[] => {
        var output = [];
        for (let i = 0; i < numberOfElements; i++){
            output.push(<LoaderElement 
                action={action} 
                key={i}
                width={`${100/numberOfElements}%`}
                delay={`${i*loaderSettings.delay/1000}s`}
                duration={`${loaderSettings.duration/1000}s`}
                timingFunction={loaderSettings.timingFunction}
                />)
        }
        return output;
    }

    const renderContent = () => {
        switch(imageLoading.currentStep){
            case ImageLoadingStep.preLoading:
            case ImageLoadingStep.postLoading:
                return renderElements(loaderSettings.numberOfElements, imageLoading.currentStep)
            case ImageLoadingStep.loading:
                return <div className={classes.loaderContainer}><CircularProgress /></div>
            case ImageLoadingStep.none:
            default:
                return <></>
        }
    }

    return (
        <div className={classes.container}>
            {renderContent()}
        </div>
    )
}

export default Loader