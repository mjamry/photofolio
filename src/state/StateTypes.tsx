//SETTINGS STATE
export type SettingsState = {
    animation: {
        delay: number, 
        duration: number,
    }
}

export enum SettingsStateActions {

}


//ANIMATION STATE
export type AnimationState = {
    currentStep: AnimationStep,
}

export enum AnimationStateActions {
    setStep,
}

export enum AnimationStep {
    fadeIn,
    fadeOut,
    loading,
    none
}

//APP STATE
export type AppState = {
    settings: SettingsState,
    animation: AnimationState,
}

export type AppDispatch = (action: AppStateReducerAction) => void

export type AppStateReducerAction = {
    type: SettingsStateActions | AnimationStateActions, 
    payload: any
}