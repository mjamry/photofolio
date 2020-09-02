export type ImageLoadingState = {
    currentStep: ImageLoadingStep,
}

export enum ImageLoadingStep {
    preLoading,
    postLoading,
    loading,
    none
}


export const ImageLoadingStateActions = {
    setStep: 'setStep',
}