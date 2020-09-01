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