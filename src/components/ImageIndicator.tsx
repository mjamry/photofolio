import React, { useRef, useEffect, useState } from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles'
import { useImageLoadingState, useImageIndicatorSettings } from '../state/AppState';
import { ImageLoadingStep } from '../state/ImageLoadingState'
import {fade} from '@material-ui/core/styles/colorManipulator'

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

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexFlow: 'column',
    },
    indocator: {
        display: 'flex',
        flexFlow: 'row',
        color: theme.palette.primary.main,
    },
    stripe: {
        '&:hover':{
            borderBottom: `2px solid ${fade(theme.palette.primary.main, 1)}`,
            cursor: 'pointer',
        },
        width: SETTINGS.normalWidth,
        height: '10px',
        borderBottom: `2px solid ${fade(theme.palette.primary.main, .25)}`,
        marginBottom: '3px',
        marginTop: '3px',
        marginRight: '8px',
        fontSize: '8pt',
    },
    activeStripe: {
        width: SETTINGS.activeWidth,

        borderBottom: `2px solid ${fade(theme.palette.primary.main, 1)}`,
    },
    activeNumber: {
        opacity: '.75'
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
            width: SETTINGS.normalWidth,
            borderBottom: `2px solid ${fade(theme.palette.primary.main, .5)}`,
        },
        to: {
            width: SETTINGS.activeWidth,
            borderBottom: `3px solid ${fade(theme.palette.primary.main, .5)}`,
        }
    },
    '@keyframes hideStripe':{
        from: {
            width: SETTINGS.activeWidth,
            borderBottom: `3px solid ${fade(theme.palette.primary.main, .5)}`,
        },
        to: {
            width: SETTINGS.normalWidth,
            borderBottom: `2px solid ${fade(theme.palette.primary.main, .25)}`,
        }
    },    
    '@keyframes showNumber':{
        from: {
            opacity: '0'
        },
        to: {
            opacity: '.75'
        }
    },
    '@keyframes hideNumber':{
        from: {
            opacity: '.75'
        },
        to: {
            opacity: '0'
        }
    }
}))

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
    const settings = useImageIndicatorSettings()
    const classes = useStyles(settings)
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

    const renderStripe = (index: number) => {
        return (
            <div 
                className={classes.indocator} 
                key={index} 
                onClick={()=>props.onClick(index)}
            >
                <div className={classes.stripe} />
            </div>
        )
    }

    const renderActiveStripe = (index: number) => {
        return (
            <div 
                className={`${classes.indocator}`} 
                key={index} 
                ref={activeStripeRef}
            >
                <div className={`${classes.stripe} ${stripeAnimationClass} `} />
                <div className={`${numberAnimationClass}`}>{renderItemNumber(index)}</div>
            </div>
        )
    }

    const renderStripes = (): React.ReactNode[] => {
        const {startIndex, endIndex} = indexCalculatorHelper(props.currentItemIndex, props.numberOfItems, props.numberOfItemsToShow)
        
        let output = []
        for(let i = startIndex; i < endIndex; i++){
            output.push(
                i === props.currentItemIndex 
                ? renderActiveStripe(i) 
                : renderStripe(i)
            )
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