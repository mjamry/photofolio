import React, { useState, useEffect } from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles'
import LoaderElement from './LoaderElement';
import { setTimeout } from 'timers';
import CircularProgress from '@material-ui/core/CircularProgress'
import {useImageLoadingState, useAppDispatch, useLoaderSettingsState} from './../state/AppState'
import { ImageLoadingStep, ImageLoadingStateActions } from '../state/ImageLoadingState';
import { LoaderSettingsState } from '../state/SettingsState';

const useStyles = makeStyles<Theme, LoaderSettingsState>({
    container: {
        display: 'flex',
        flexFlow: 'row',
        height: '100%',
    },
    loaderContainer: props => ({
        width: '100%',
        height: '100%',
        backgroundColor: props.color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
})

type Props = {
    show: boolean,
}

const Loader = (props: Props) => {
    const {show} = props;
    const [timer, setTimer] = useState<any | null>(null);

    const animationState = useImageLoadingState()
    const loaderSettings = useLoaderSettingsState()
    const appDispatch = useAppDispatch()

    const classes = useStyles(loaderSettings)

    const renderElements = (numberOfElements: number, action: ImageLoadingStep):JSX.Element[] => {
        var output = [];
        for (let i = 0; i < numberOfElements; i++){
            output.push(<LoaderElement 
                action={action} 
                key={i}
                width={`${100/numberOfElements}%`}
                color={loaderSettings.color}
                delay={`${i*loaderSettings.delay/1000}s`}
                duration={`${loaderSettings.duration/1000}s`}
                timingFunction={loaderSettings.timingFunction}
                />)
        }
        return output;
    }

    const setAction = (action: ImageLoadingStep) => {
        appDispatch({type: ImageLoadingStateActions.setStep, payload: action})
    }

    useEffect(()=> {
        clearTimeout(timer)
        if(show){
            setAction(ImageLoadingStep.preLoading)
            const timer = setTimeout(
                ()=>setAction(ImageLoadingStep.loading), 
                loaderSettings.animationTimeout
            );
            setTimer(timer);
        }else{
            setAction(ImageLoadingStep.postLoading)
            const timer = setTimeout(
                ()=>setAction(ImageLoadingStep.none),
                loaderSettings.animationTimeout
            );
            setTimer(timer);
        }
        
    }, [show])

    useEffect(()=>{
        console.log(ImageLoadingStep[animationState.currentStep])
    }, [animationState.currentStep])

    const renderContent = () => {
        switch(animationState.currentStep){
            case ImageLoadingStep.preLoading:
            case ImageLoadingStep.postLoading:
                return renderElements(loaderSettings.numberOfElements, animationState.currentStep)
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