import React, { useState, useEffect } from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles'
import LoaderElement from './LoaderElement';
import { setTimeout } from 'timers';
import CircularProgress from '@material-ui/core/CircularProgress'
import {useAnimationState, useAppDispatch, useLoaderSettingsState} from './../state/AppState'
import { AnimationStep, AnimationStateActions } from '../state/AnimationState';
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

    const animationState = useAnimationState()
    const loaderSettings = useLoaderSettingsState()
    const appDispatch = useAppDispatch()

    const classes = useStyles(loaderSettings)

    const renderElements = (numberOfElements: number, action: AnimationStep):JSX.Element[] => {
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

    const setAction = (action: AnimationStep) => {
        appDispatch({type: AnimationStateActions.setStep, payload: action})
    }

    useEffect(()=> {
        clearTimeout(timer)
        if(show){
            setAction(AnimationStep.fadeIn)
            const timer = setTimeout(
                ()=>setAction(AnimationStep.loading), 
                loaderSettings.animationTimeout
            );
            setTimer(timer);
        }else{
            setAction(AnimationStep.fadeOut)
            const timer = setTimeout(
                ()=>setAction(AnimationStep.none),
                loaderSettings.animationTimeout
            );
            setTimer(timer);
        }
        
    }, [show])

    useEffect(()=>{
        console.log(AnimationStep[animationState.currentStep])
    }, [animationState.currentStep])

    const renderContent = () => {
        switch(animationState.currentStep){
            case AnimationStep.fadeIn:
            case AnimationStep.fadeOut:
                return renderElements(loaderSettings.numberOfElements, animationState.currentStep)
            case AnimationStep.loading:
                return <div className={classes.loaderContainer}><CircularProgress /></div>
            case AnimationStep.none:
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