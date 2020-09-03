import React from 'react';
import {makeStyles} from '@material-ui/core/styles'

export type Props = {
    numberOfItems: number,
    numberOfItemsToShow: number,
    currentItemIndex: number,
    onClick: (selectedIndex: number) => void,
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexFlow: 'column',
    },
    indocator: {
        display: 'flex',
        flexFlow: 'row'
    },
    stripe: {
        '&:hover':{
            borderBottom: '4px solid rgba(0, 0, 0, .5)',
            cursor: 'pointer',
        },
        width: '50px',
        height: '10px',
        borderBottom: '2px solid rgba(0, 0, 0, .25)',
        marginBottom: '2px',
        marginTop: '2px',
        marginRight: '5px',
        fontSize: '8pt',
    },
    activeStripe: {
        width: '75px',
    },
    itemNumber: {
        color: 'rgba(0, 0, 0, .5)'
    }
})

const indexCalculatorHelper = (
    currentIndex: number, 
    numberOfItems: number, 
    numberOfItemsToShow: number): {startIndex: number, endIndex: number} => 
{
    const start = Math.round(currentIndex - (numberOfItemsToShow/2))
    const startCorrection = numberOfItems - start
    const startIndex = 
        start < 0 
        ? 0 
        : (startCorrection < numberOfItemsToShow 
            ? numberOfItems - numberOfItemsToShow 
            : start);

    const end = Math.round(numberOfItemsToShow + startIndex)
    const endIndex = end > numberOfItems ? numberOfItems : end ;
    
    return {startIndex, endIndex}
}

const ImageIndicator = (props: Props) => {
    const classes = useStyles()

    const renderItemNumber = (index: number) => {
        return (index > 8 ? index + 1 : `0${index+1}`)
    }

    const renderStripes = (): React.ReactNode[] => {
        const {startIndex, endIndex} = indexCalculatorHelper(props.currentItemIndex, props.numberOfItems, props.numberOfItemsToShow)
        
        let output = []
        for(let i = startIndex; i < endIndex; i++){
            output.push(
                i === props.currentItemIndex 

                ? <div className={classes.indocator} key={i}>
                    <div className={`${classes.stripe} ${classes.activeStripe}`} />
                    <div className={classes.itemNumber}>{renderItemNumber(i)}</div>
                </div>

                : <div 
                    className={classes.indocator} 
                    key={i} 
                    onClick={()=>props.onClick(i)}
                >
                    <div className={classes.stripe} />
                </div>)
        }

        return output
    }

    return (
        <div className={classes.container}>
            {renderStripes()}
        </div>
    )
}

export default ImageIndicator