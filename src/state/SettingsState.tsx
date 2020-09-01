export type SettingsState = {
    animation: {
        delay: number, 
        duration: number,
    },
    loader: {
        numberOfElements: number, 
        color: string,
        delay: number, 
        duration: number,
        timingFunction: string,
        animationTimeout: number,
    }
}

export enum SettingsStateActions {

}

//const values
const numberOfElements = 5
const durationInMs = 500
const delayInMs = 100


export const InitialSettingsState: SettingsState = {
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
}