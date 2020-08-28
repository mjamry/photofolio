export type SettingsState = {
    animation: {
        delay: number, 
        duration: number,
    }
}

export type AnimationState = {
    currentStep: AnimationStep,
}

export type AppState = {
    settings: SettingsState,
    animation: AnimationState,
}

export enum AnimationStep {
    fadeIn,
    fadeOut,
    loading,
    none
}

export enum Actions { 
    setAnimationStep,
}
export type ReducerAction = {
    type: Actions, 
    payload: any
}