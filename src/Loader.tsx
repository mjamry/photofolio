import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles'
import LoaderElement, { LoaderActions } from './LoaderElement';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexFlow: 'row',
        height: '100%',
    }
})

type Props = {
    numberOfElements: number,
    show: boolean
}

const DELAY_BETWEEN_ELEMENTS_IN_MS = 100;

const Loader = (props: Props) => {
    const classes = useStyles()
    const {show} = props;
    const [elements, setElements] = useState<JSX.Element[]>([]);

    const renderElements = (numberOfElements: number):JSX.Element[] => {
        var output = [];
        for (let i = 0; i < numberOfElements; i++){
            const index = Date.now()+i;
            output.push(<LoaderElement 
                action={show ? LoaderActions.fadeIn : LoaderActions.fadeOut} 
                delayInMs={i*DELAY_BETWEEN_ELEMENTS_IN_MS} 
                key={index}
                id={index}/>)

                console.log(new Date().toISOString()+' render '+index)
        }
        return output;
    }

    useEffect(()=> {
        setElements(renderElements(props.numberOfElements))
    }, [props.show])
    
    return (
        <div className={classes.container}>
            {elements}
        </div>
    )
}

export default Loader