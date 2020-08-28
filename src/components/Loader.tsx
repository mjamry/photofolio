import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles'
import LoaderElement, { LoaderActions } from './LoaderElement';
import { setTimeout } from 'timers';
import CircularProgress from '@material-ui/core/CircularProgress'

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
    const [elements, setElements] = useState<JSX.Element[]>([]);
    const [action, setAction] = useState<LoaderActions>(LoaderActions.none);
    const [timer, setTimer] = useState<any | null>(null);

    const animationDuration = 
        //props.numberOfElements*settings.duration 
        + ((0+(props.numberOfElements-1)*settings.delay)/2)*(props.numberOfElements-1)


    const renderElements = (numberOfElements: number, action: LoaderActions):JSX.Element[] => {
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

    useEffect(()=> {
        clearTimeout(timer)
        if(show){
            setAction(LoaderActions.fadeIn)
            const timer = setTimeout(()=>setAction(LoaderActions.loading), animationDuration);
            setTimer(timer);
        }else{
            setAction(LoaderActions.fadeOut)
            const timer = setTimeout(()=>setAction(LoaderActions.none), animationDuration);
            setTimer(timer);
        }
        
    }, [show])

    useEffect(()=>{
        console.log(LoaderActions[action])
    }, [action])

    const renderContent = () => {
        switch(action){
            case LoaderActions.fadeIn:
            case LoaderActions.fadeOut:
                return renderElements(props.numberOfElements, action)
            case LoaderActions.loading:
                return <div className={classes.loaderContainer}><CircularProgress /></div>
            case LoaderActions.none:
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