export type SettingsState = 
{
    animation: {
        delay: number, 
        duration: number,
    },
    loader: LoaderSettingsState,
    imageViewer: {
        duration: number,
        timingFunction: string,
        height: string,
        width: string
    }
}

export type LoaderSettingsState = 
{
    numberOfElements: number, 
    color: string,
    delay: number, 
    duration: number,
    timingFunction: string,
    animationTimeout: number,
}

export enum SettingsStateActions {

}

//const values
    //loader
    const numberOfElements = 5
    const durationInMs = 500
    const delayInMs = 100
    //img imageViewer
    const height = 80
    const ratio = 1.5

export const InitialSettingsState: SettingsState = 
{
    animation: {
        duration: 500,
        delay: 100,
    },
    loader: {
        numberOfElements: numberOfElements, 
        color: 'white',
        delay: delayInMs, 
        duration: durationInMs,
        timingFunction: 'cubic-bezier(.90, 0, .30, 1)',
        animationTimeout: ((0 + (numberOfElements - 1) * delayInMs / 2) * (numberOfElements - 1))
    },

    imageViewer: {
        duration: 700,
        timingFunction: 'cubic-bezier(.90, 0, .30, 1)',
        height: `${height}vh`,
        width: `calc(${height}vh * ${ratio})`
    }
}