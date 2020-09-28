import React, {createContext, useContext, useReducer} from 'react'
import {AppState, AppStateReducerAction, AppDispatch } from './StateTypes'
import { ImageLoadingStep, ImageLoadingState, ImageLoadingStateActions } from './ImageLoadingState'
import { SettingsState, InitialSettingsState } from './SettingsState'
import { ImageDataState, ImageDataStateActions, ThemeType } from './ImageDataState'

type Props = {
    children: React.ReactNode,
}

const initialState: AppState = {
    settings: InitialSettingsState,
    imageLoading: {
        currentStep: ImageLoadingStep.none
    },
    imageData: {
        currentImageIndex: 0,
        imagesData: [],
        uiTheme: ThemeType.light,
    }
}

//REDUCERS

const _animationReducer = (state: ImageLoadingState, action: AppStateReducerAction) => {
    switch(action.type) {
        case ImageLoadingStateActions.setStep: 
            state = {...state, currentStep: action.payload}
            break
    }

    return state
}

const _settingsReducer = (state: SettingsState, action: AppStateReducerAction) => {
    return state
}

const _imageDataReducer = (state: ImageDataState, action: AppStateReducerAction) => {
    switch(action.type) {
        case ImageDataStateActions.setCurrentIndex:
            state = {...state, currentImageIndex: action.payload}
            break
        case ImageDataStateActions.setImageData: 
            state = {...state, imagesData: action.payload}
            break
        case ImageDataStateActions.setUiTheme:
            state = {...state, uiTheme: action.payload}
            break
    }
    
    return state
}


const _reducer = (state: AppState, action: AppStateReducerAction) => {
    return {
        imageLoading: _animationReducer(state.imageLoading, action),
        settings: _settingsReducer(state.settings, action),
        imageData: _imageDataReducer(state.imageData, action)
    }
}

//PROVIDER

const AppStateProvider = ({children}: Props) => {
    const [state, dispatch] = useReducer(_reducer, initialState)
    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppStateContext.Provider value={state}>
                {children}
            </AppStateContext.Provider>
        </AppDispatchContext.Provider>
    )
}

const AppStateContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<AppDispatch | undefined>(undefined);

//SELECTORS
export {
    useImageLoadingState, 
    useSettingsState, 
    useLoaderSettingsState, 
    useImageViewerSettings, 
    useImageDataState, 
    useGapiClientSettingsState,
    useImagesPathsSettingsState,
    useImageIndicatorSettings
}

const useAppState = () => {
    const context = useContext(AppStateContext)
    if(context === undefined){
        throw new Error("AppStateContext must be used with provider")
    }

    return context
}

const useImageDataState = () => {
    return useAppState().imageData
}

const useImageLoadingState = () => {
    return useAppState().imageLoading
}

const useSettingsState = () => {
    return useAppState().settings
}

const useLoaderSettingsState = () => {
    return useAppState().settings.loader
}

const useGapiClientSettingsState = () => {
    return useAppState().settings.gapiClient
}

const useImagesPathsSettingsState = () => {
    return useAppState().settings.imagesPaths
}

const useImageViewerSettings = () => {
    return useAppState().settings.imageViewer
}

const useImageIndicatorSettings = () => {
    return useAppState().settings.imageIndicator
}

const useAppDispatch = () => {
    const context = useContext(AppDispatchContext)
    if(context === undefined){
        throw new Error("AppDispatchContext must be used with provider")
    }

    return context
}

export {AppStateProvider, useAppDispatch}