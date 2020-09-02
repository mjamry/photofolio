export type ImageLoadingState = {
    currentStep: ImageLoadingStep,
}

export enum ImageLoadingStateActions {
    setStep,
}

export enum ImageLoadingStep {
    preLoading,
    postLoading,
    loading,
    none
}