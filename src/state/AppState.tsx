import React, {createContext, useContext, useReducer} from 'react'
import {AppState, ReducerAction, Actions, AnimationStep} from './StateTypes'

type Props = {
    children: JSX.Element,
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

const AppContext = createContext<{
    state: AppState,
    dispatch: React.Dispatch<any>
}>({
    state: initialState,
    dispatch: () => null
});

const AppStateProvider = (props: Props) => {
    const [state, dispatch] = useReducer(_reducer, initialState)
    return (
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    )
}

var useAppState = () => useContext(AppContext);

const _reducer = (state: AppState, action: ReducerAction) => {
    switch(action.type){
        case Actions.setAnimationStep:
            state = {...state, animation: {...state.animation, currentStep: action.payload}}
            break;
    }

    return state;
}

export default AppStateProvider;
export {AppContext, AppStateProvider, useAppState}