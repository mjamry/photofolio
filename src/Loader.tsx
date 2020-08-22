import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import LoaderElement, { LoaderActions } from './LoaderElement';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexFlow: 'row',
        height: '100%'
    }
})

type Props = {
    numberOfElements: number,
    show: boolean
}

const Loader = (props: Props) => {
    const classes = useStyles()
    const {show} = props;
    
    return (
        <div className={classes.container}>
            <LoaderElement action={show ? LoaderActions.fadeIn : LoaderActions.fadeOut} delayInMs={0} />
            <LoaderElement action={show ? LoaderActions.fadeIn : LoaderActions.fadeOut} delayInMs={300} />
            <LoaderElement action={show ? LoaderActions.fadeIn : LoaderActions.fadeOut} delayInMs={600} />
            <LoaderElement action={show ? LoaderActions.fadeIn : LoaderActions.fadeOut} delayInMs={900} />
        </div>
    )
}

export default Loader