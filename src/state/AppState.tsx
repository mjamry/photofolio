import React, {createContext, useContext, useReducer} from 'react'
import {AppState, AppStateReducerAction, AnimationStep, AppDispatch, AnimationState, AnimationStateActions, SettingsState} from './StateTypes'

type Props = {
    children: React.ReactNode,
}

const initialState: AppState = {
    settings: {
        animation: {
            duration: 500,
            delay: 100,
        }
    },
    animation: {
        currentStep: AnimationStep.none
    }
}

const _animationReducer = (state: AnimationState, action: AppStateReducerAction) => {
    switch(action.type) {
        case AnimationStateActions.setStep: 
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

var useAppState = () => {
    const context = useContext(AppStateContext)
    if(context === undefined){
        throw new Error("AppStateContext must be used with provider")
    }

    return context
}
var useAppDispatch = () => {
    const context = useContext(AppDispatchContext)
    if(context === undefined){
        throw new Error("AppDispatchContext must be used with provider")
    }

    return context
}


export default AppStateProvider;
export {AppStateProvider, useAppState, useAppDispatch}