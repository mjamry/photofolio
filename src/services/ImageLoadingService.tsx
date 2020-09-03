import { useLoaderSettingsState, useAppDispatch, useImageDataState } from "../state/AppState";
import { useState } from "react";
import { ImageLoadingStep, ImageLoadingStateActions } from "../state/ImageLoadingState";
import { ImageDataStateActions } from "../state/ImageDataState";

export type ServiceOutput = {
    loadNext: () => Promise<string>,
    loadBefore: () => Promise<string>,
    loadCustom: (index: number) => Promise<string>
}

export const useImageLoadingService = (): ServiceOutput => 
{
    const helper = useImageLoadingHelper()
	const imageDataState = useImageDataState()

    const next = async ():Promise<string> => 
    {
        const nextIndex = imageDataState.currentImageIndex + 1
        return helper.loadImageByIndex(nextIndex)
    }

    const before = async ():Promise<string> => 
    {
        const beforeIndex = imageDataState.currentImageIndex - 1
        return helper.loadImageByIndex(beforeIndex)
    }

    const custom = async (customIndex: number):Promise<string> => 
    {
        return helper.loadImageByIndex(customIndex)
    } 
    
    return {
        loadNext: next,
        loadBefore: before,
        loadCustom: custom
    }
}

export const useImageLoadingHelper = () => {
    
    const loaderSettings = useLoaderSettingsState()
    const appDispatch = useAppDispatch()
	const imageDataState = useImageDataState()
    
    const [timer, setTimer] = useState<any | null>(null);

    const setAction = (action: ImageLoadingStep) => 
    {
        appDispatch({type: ImageLoadingStateActions.setStep, payload: action})
    }
    
    const preLoad = async (): Promise<void> => {
        return new Promise<void>((resolve, reject) => 
        {
            clearTimeout(timer)
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

    const load = async (index: number): Promise<string> => {
        return new Promise<string>((resolve, reject) => 
        {
            const imageSrc = imageDataState.imagesData[index].webContentLink
            
            const img = new Image()
            img.onload = () => 
            {
                resolve(imageSrc)
            }
            img.src = imageSrc
            
            setAction(ImageLoadingStep.loading)  
            appDispatch({type: ImageDataStateActions.setCurrentIndex, payload: index})
        })
    }
    
    const loadImage = async (index: number): Promise<string> => {
        await preLoad()
        const imgSrc = await load(index)
        postLoad()
        return imgSrc
    }

    return {
        loadImageByIndex: loadImage
    }
}