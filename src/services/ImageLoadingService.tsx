import { useLoaderSettingsState, useAppDispatch } from "../state/AppState";
import { useState } from "react";
import { ImageLoadingStep, ImageLoadingStateActions } from "../state/ImageLoadingState";

export const useImageLoadingService = () => {
    
    const loaderSettings = useLoaderSettingsState()
    const appDispatch = useAppDispatch()
    
    const [timer, setTimer] = useState<any | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const setAction = (action: ImageLoadingStep) => 
    {
        appDispatch({type: ImageLoadingStateActions.setStep, payload: action})
    }
    
    const preLoad = async (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            clearTimeout(timer)
            setIsLoaded(false)
            setAction(ImageLoadingStep.preLoading)
        
            setTimer(
                setTimeout(resolve, loaderSettings.animationTimeout)   
            )
        })
    }

    const postLoad = async () => {
        setAction(ImageLoadingStep.postLoading)
        setTimer(
            setTimeout(
                ()=>setAction(ImageLoadingStep.none),
                loaderSettings.animationTimeout
            )
        )
    }

    const load = async (imgSrc: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            
            const img = new Image()
            img.onload = () => 
            {
                setIsLoaded(true)
                resolve()
            }
            img.src = imgSrc
            
            setAction(ImageLoadingStep.loading)  
        })
    }
    
    const loadImage = async (imgSrc: string): Promise<string> => {
        await preLoad()
        await load(imgSrc)
        postLoad()
        return imgSrc
    }

    return {
        loadImage: loadImage
    }
}