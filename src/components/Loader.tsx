import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles'
import LoaderElement from './LoaderElement';
import { setTimeout } from 'timers';
import CircularProgress from '@material-ui/core/CircularProgress'
import {useAppState} from './../state/AppState'
import {Actions, AnimationStep} from './../state/StateTypes'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexFlow: 'row',
        height: '100%',
    },
    loaderContainer:{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

type Props = {
    numberOfElements: number,
    show: boolean,
    color: string
}

type Settings = {
    delay: number,
    duration: number,
}

const settings: Settings = {
    delay: 100,
    duration: 500,
}

const Loader = (props: Props) => {
    const classes = useStyles()
    const {show} = props;
    const [timer, setTimer] = useState<any | null>(null);

    const {state, dispatch} = useAppState()

    const animationDuration = 
        //props.numberOfElements*settings.duration 
        + ((0+(props.numberOfElements-1)*settings.delay)/2)*(props.numberOfElements-1)


    const renderElements = (numberOfElements: number, action: AnimationStep):JSX.Element[] => {
        var output = [];
        for (let i = 0; i < numberOfElements; i++){
            output.push(<LoaderElement 
                action={action} 
                key={i}
                id={i}
                width={`${100/numberOfElements}%`}
                color={props.color}
                delay={`${i*settings.delay/1000}s`}
                duration={`${settings.duration/1000}s`}
                />)
        }
        return output;
    }

    const setAction = (action: AnimationStep) => {
        dispatch({type: Actions.setAnimationStep, payload: action})
    }

    useEffect(()=> {
        clearTimeout(timer)
        if(show){
            setAction(AnimationStep.fadeIn)
            const timer = setTimeout(
                ()=>setAction(AnimationStep.loading), 
                animationDuration
            );
            setTimer(timer);
        }else{
            setAction(AnimationStep.fadeOut)
            const timer = setTimeout(
                ()=>setAction(AnimationStep.none),
                animationDuration
            );
            setTimer(timer);
        }
        
    }, [show])

    useEffect(()=>{
        console.log(AnimationStep[state.animation.currentStep])
    }, [state.animation.currentStep])

    const renderContent = () => {
        switch(state.animation.currentStep){
            case AnimationStep.fadeIn:
            case AnimationStep.fadeOut:
                return renderElements(props.numberOfElements, state.animation.currentStep)
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