import React, { useRef, useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles'
import { useImageLoadingState } from '../state/AppState';
import { ImageLoadingStep } from '../state/ImageLoadingState';

export type Props = {
    numberOfItems: number,
    numberOfItemsToShow: number,
    currentItemIndex: number,
    onClick: (selectedIndex: number) => void,
}

const SETTINGS = {
    normalWidth: '50px',
    activeWidth: '75px',
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
        width: SETTINGS.normalWidth,
        height: '12px',
        borderBottom: '2px solid rgba(0, 0, 0, .25)',
        marginBottom: '3px',
        marginTop: '3px',
        marginRight: '8px',
        fontSize: '8pt',
    },
    activeStripe: {
        width: SETTINGS.activeWidth,
    },
    activeNumber: {
        opacity: '.5'
    },
    hiddenNumber: {
        opacity: '0'
    },
    animation: {
        animationDuration: '.75s',
        animationTimingFunction: 'cubic-bezier(.90, 0, .30, 1)',
        animationFillMode: 'both',
    },
    stripeAnimationShow: {
        animationName: '$showStripe'
    },
    stripeAnimationHide: {
        animationName: '$hideStripe'
    },
    numberAnimationHide: {
        animationName: '$hideNumber'
    },
    numberAnimationShow: {
        animationName: '$showNumber'
    },
    '@keyframes showStripe':{
        from: {
            width: SETTINGS.normalWidth
        },
        to: {
            width: SETTINGS.activeWidth
        }
    },
    '@keyframes hideStripe':{
        from: {
            width: SETTINGS.activeWidth
        },
        to: {
            width: SETTINGS.normalWidth
        }
    },    
    '@keyframes showNumber':{
        from: {
            opacity: '0'
        },
        to: {
            opacity: '.5'
        }
    },
    '@keyframes hideNumber':{
        from: {
            opacity: '.5'
        },
        to: {
            opacity: '0'
        }
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
    const activeStripeRef = useRef<HTMLDivElement>(null)
    const [stripeAnimationClass, setStripeAnimationClass] = useState("")
    const [numberAnimationClass, setNumberAnimationClass] = useState("")

    const imageLoading = useImageLoadingState()

    useEffect(()=>{
        let stripeAnimation = `${classes.animation} `
        let numberAnimation = `${classes.animation} `
        switch(imageLoading.currentStep){
            case ImageLoadingStep.preLoading:
                stripeAnimation += classes.stripeAnimationHide
                numberAnimation += classes.numberAnimationHide
                break
            case ImageLoadingStep.postLoading:
                stripeAnimation += classes.stripeAnimationShow
                numberAnimation += classes.numberAnimationShow
                break
            case ImageLoadingStep.loading:
                numberAnimation += classes.hiddenNumber
                break
            case ImageLoadingStep.none:
                stripeAnimation += classes.activeStripe
                numberAnimation += classes.activeNumber
                break
        }

        setStripeAnimationClass(stripeAnimation)
        setNumberAnimationClass(numberAnimation)

    }, [imageLoading.currentStep])

    const renderItemNumber = (index: number) => {
        return (index > 8 ? index + 1 : `0${index+1}`)
    }

    const renderStripes = (): React.ReactNode[] => {

        console.log(numberAnimationClass)

        const {startIndex, endIndex} = indexCalculatorHelper(props.currentItemIndex, props.numberOfItems, props.numberOfItemsToShow)
        
        let output = []
        for(let i = startIndex; i < endIndex; i++){
            output.push(
                i === props.currentItemIndex 

                ? <div 
                    className={`${classes.indocator}`} 
                    key={i} 
                    ref={activeStripeRef}
                >
                    <div className={`${classes.stripe} ${stripeAnimationClass} `} />
                    <div className={`${numberAnimationClass}`}>{renderItemNumber(i)}</div>
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