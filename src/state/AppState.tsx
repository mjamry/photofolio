import React, {createContext, useContext, useReducer} from 'react'
import {AppState, AppStateReducerAction, AppDispatch } from './StateTypes'
import { ImageLoadingStep, ImageLoadingState, ImageLoadingStateActions } from './ImageLoadingState'
import { SettingsState, InitialSettingsState } from './SettingsState'

type Props = {
    children: React.ReactNode,
}

const initialState: AppState = {
    settings: InitialSettingsState,
    animation: {
        currentStep: ImageLoadingStep.none
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


const _reducer = (state: AppState, action: AppStateReducerAction) => {
    return {
        animation: _animationReducer(state.animation, action),
        settings: _settingsReducer(state.settings, action)
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
export {useImageLoadingState, useSettingsState, useLoaderSettingsState, useImageViewerSettings}

var useAppState = () => {
    const context = useContext(AppStateContext)
    if(context === undefined){
        throw new Error("AppStateContext must be used with provider")
    }

    return context
}

var useImageLoadingState = () => {
    return useAppState().animation
}

var useSettingsState = () => {
    return useAppState().settings
}

var useLoaderSettingsState = () => {
    return useAppState().settings.loader
}

var useImageViewerSettings = () => {
    return useAppState().settings.imageViewer
}

var useAppDispatch = () => {
    const context = useContext(AppDispatchContext)
    if(context === undefined){
        throw new Error("AppDispatchContext must be used with provider")
    }

    return context
}

export {AppStateProvider, useAppDispatch}